import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';

const getComponent = (componentName: string) =>
  dynamic(() => import(`../components/${componentName}`), { ssr: true });

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Get components for the root route
  const componentList = data[''] || ['Header', 'Home'];

  const components = await Promise.all(
    componentList.map(async (name: string) => ({
      name,
      Component: getComponent(name)
    }))
  );

  return (
    <main className="min-h-screen p-4">
      {components.map(({ name, Component }, idx) => (
        <section key={idx} className="mb-4">
          <Component />
        </section>
      ))}
    </main>
  );
}

// Add revalidation for the home page
export const revalidate = 30;
