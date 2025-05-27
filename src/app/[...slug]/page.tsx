import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const getComponent = (componentName: string) =>
  dynamic(() => import(`../../components/${componentName}`), { ssr: true });

interface PageProps {
  params: {
    slug?: string[];
  };
}

export default async function DynamicPage(props: PageProps) {
  const { params } = props; // ✅ Destructure inside the function body
  
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const { slug } = await params
  const slugPath = (slug || []).join('/');
  const componentList = data[slugPath];

  if (!componentList) {
    notFound();
  }

  const components = await Promise.all(
    componentList.map(async (name: string) => ({
      name,
      Component: getComponent(name),
    }))
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
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return Object.keys(data)
    .filter((slugPath) => slugPath !== '')
    .map((slugPath) => ({
      slug: slugPath.split('/'),
    }));
}

export const revalidate = 30;
