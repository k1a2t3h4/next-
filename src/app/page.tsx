import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';

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

    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), 'src', 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Create the temporary file with the component code
    const tempFile = path.join(tmpDir, key);
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

// Create a wrapper component for dynamic imports
const DynamicComponent = dynamic(
  () => Promise.resolve(({ Component }: { Component: React.ComponentType }) => <Component />),
  { ssr: false }
);

export default async function Home() {
  try {
    // Get pages data from R2
    const data = await getPagesFromR2();
    const componentList = data[''] || ['Header', 'Home'];

    // Load components from R2
    const components = await Promise.all(
      componentList.map(async (name: string) => {
        try {
          const key = `${name}.tsx`;
          const tempFile = await getComponentFromR2(key);
          
          // Dynamically import the component
          const Component = (await import(tempFile)).default;
          
          return {
            name,
            Component,
          };
        } catch (error) {
          console.error(`Error loading component ${name}:`, error);
          return {
            name,
            Component: () => <div>Error loading {name}</div>,
          };
        }
      })
    );

    return (
      <main className="min-h-screen p-4">
        {components.map(({ name, Component }, idx) => (
          <section key={idx} className="mb-4">
            <DynamicComponent Component={Component} />
          </section>
        ))}
      </main>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return <div>Error loading components</div>;
  }
}

// Add revalidation for the home page
export const revalidate = 30;
