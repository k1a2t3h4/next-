import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import { notFound } from 'next/navigation';

async function getComponentFromR2(key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    const response = await r2Client.send(command);
    const componentCode = await response.Body?.transformToString();
    
    if (!componentCode) {
      throw new Error('Component code not found');
    }

    // Create a temporary file with the component code
    const tempFile = `/tmp/${key}`;
    const fs = require('fs');
    fs.writeFileSync(tempFile, componentCode);

    return tempFile;
  } catch (error) {
    console.error('Error loading component from R2:', error);
    throw error;
  }
}

async function getPagesFromR2() {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: 'pages.json',
    });

    const response = await r2Client.send(command);
    const pagesData = await response.Body?.transformToString();
    
    if (!pagesData) {
      throw new Error('Pages data not found');
    }

    return JSON.parse(pagesData);
  } catch (error) {
    console.error('Error loading pages from R2:', error);
    throw error;
  }
}

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function DynamicPage(props: PageProps) {
  const { params } = props;
  const { slug } = params;
  const slugPath = (slug || []).join('/');

  try {
    // Get pages data from R2
    const data = await getPagesFromR2();
    const componentList = data[slugPath];

    if (!componentList) {
      notFound();
    }

    // Load components from R2
    const components = await Promise.all(
      componentList.map(async (name: string) => {
        const key = `${name}.tsx`;
        const tempFile = await getComponentFromR2(key);
        
        // Dynamically import the component
        const Component = (await import(tempFile)).default;
        
        return {
          name,
          Component,
        };
      })
    );

    return (
      <main className="min-h-screen p-4">
        {components.map(({ name, Component }, idx) => (
          <div key={idx} className="mb-4">
            <Component />
          </div>
        ))}
      </main>
    );
  } catch (error) {
    console.error('Error in DynamicPage:', error);
    return <div>Error loading components</div>;
  }
}

export const revalidate = 30;
