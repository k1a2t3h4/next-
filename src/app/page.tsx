// src/app/page.tsx
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import dynamic from 'next/dynamic';
import * as esbuild from 'esbuild';
import React from 'react';

// Load a .tsx file from R2 and compile it using esbuild
async function getComponentFromR2(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
  });

  const response = await r2Client.send(command);
  const componentCode = await response.Body?.transformToString();

  if (!componentCode) throw new Error('Component code not found');

  const compiled = await esbuild.transform(componentCode, {
    loader: 'tsx',
    format: 'cjs',
    target: 'es2020',
  });

  return compiled.code;
}

// Evaluate compiled JS and return the default React component
function evaluateComponent(code: string): React.ComponentType {
  const module = { exports: {} as { default: React.ComponentType } };

  const requireShim = (mod: string) => {
    if (mod === 'react') return require('react');
    if (mod === 'next/link') return require('next/link');
    throw new Error(`Cannot resolve module: ${mod}`);
  };

  const func = new Function('require', 'exports', 'module', code);
  func(requireShim, module.exports, module);

  return module.exports.default;
}

// Get the page list from R2
async function getPagesFromR2() {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: 'pages.json',
  });

  const response = await r2Client.send(command);
  const pagesData = await response.Body?.transformToString();

  if (!pagesData) throw new Error('Pages data not found');

  return JSON.parse(pagesData);
}

// SSR-safe dynamic wrapper for rendering components
const DynamicWrapper = dynamic(
  () => Promise.resolve(({ Component }: { Component: React.ComponentType }) => <Component />),
  { ssr: false }
);

export default async function Home() {
  try {
    const pagesData = await getPagesFromR2();
    const componentList = pagesData[''] || ['Header', 'Home'];

    const components = await Promise.all(
      componentList.map(async (name: string) => {
        try {
          const key = `${name}.tsx`;
          const compiledCode = await getComponentFromR2(key);
          const Component = evaluateComponent(compiledCode);

          return { name, Component };
        } catch (err) {
          console.error(`Failed to load component ${name}:`, err);
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
            <DynamicWrapper Component={Component} />
          </section>
        ))}
      </main>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return <div>Failed to load components</div>;
  }
}

export const revalidate = 30;
