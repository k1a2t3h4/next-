import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import { notFound } from 'next/navigation';
import * as esbuild from 'esbuild';
import React from 'react';
import dynamic from 'next/dynamic';
import ClientComponent from '../../context/ClientComponent';

const R2_BUCKET_NAME_TSX = process.env.R2_BUCKET_NAME_TSX;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_BUCKET_NAME_TSX || !R2_BUCKET_NAME) {
  throw new Error('Missing required environment variables: R2_BUCKET_NAME_TSX and R2_BUCKET_NAME must be set');
}
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

function isClientComponent(code: string): boolean {
  const firstLines = code.split('\n').slice(0, 5).map(line => line.trim());
  return firstLines.includes(`'use client';`) || firstLines.includes(`"use client";`);
}

async function compileComponent(code: string): Promise<string> {
  const compiled = await esbuild.transform(code, {
    loader: 'tsx',
    format: 'cjs',
    target: 'es2020',
  });

  return compiled.code;
}

function evaluateComponent(code: string): React.ComponentType {
  const module = { exports: {} as { default: React.ComponentType } };
  // Conditionally import hooks only if client component
  const requireShim = (mod: string) => {
    if (mod === 'react') return require('react')
    if (mod === 'next/link') return require('next/link');
    throw new Error(`Cannot resolve module: ${mod}`);
  };

  const func = new Function('require', 'exports', 'module', code);
  func(requireShim, module.exports, module);

  return module.exports.default;
}

async function getRawComponentFromR2(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME_TSX,
    Key: key,
  });

  const response = await r2Client.send(command);
  const componentCode = await response.Body?.transformToString();

  if (!componentCode) throw new Error('Component code not found');

  return componentCode;
}
// async function getPagesFromR2() {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: process.env.R2_BUCKET_NAME!,
//       Key: 'pages.json',
//     });

//     const response = await r2Client.send(command);
//     const pagesData = await response.Body?.transformToString();
    
//     if (!pagesData) {
//       throw new Error('Pages data not found');
//     }

//     return JSON.parse(pagesData);
//   } catch (error) {
//     console.error('Error loading pages from R2:', error);
//     throw error;
//   }
// }

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
    const data = {
      "": ["Header","AddToCartButton","CartItemCount"],
      "blog": ["Header"],
      "products": ["Header"],
      "products/product1/detail": ["Header"],
      "cart": ["Header"],
      "login":[""]
    } as Record<string, string[]>;
    const componentList = data[slugPath];

    if (!componentList) {
      notFound();
    }

    // Load components from R2
    return (
      <main className="min-h-screen p-4">
        {await Promise.all(
      componentList.map(async (name: string, idx: number) => {
        try {
          const key = `${name}.tsx`;

          // Step 1: Get raw source code
          const rawCode = await getRawComponentFromR2(key);

          // Step 2: Detect client component
          const client = isClientComponent(rawCode);
          if(client)
          {
            return (<div key={idx}><ClientComponent name={name}/></div>)
          } else {
            // Step 3: Compile the raw code to JS
            const compiledCode = await compileComponent(rawCode);
            
            // Step 4: Evaluate the compiled code with proper require shim
            const Component = evaluateComponent(compiledCode)

            // Step 5: Create dynamic wrapper with SSR option depending on client/server
            const DynamicComponent = dynamic(
              () => Promise.resolve(({ Component }: { Component: React.ComponentType }) => <Component />),
              { ssr: true } // Disable SSR if client component
            );
            return (<div key={idx}><DynamicComponent Component={Component} /></div>)
          }
          
        } catch (err) {
          console.error(`Failed to load component ${name}:`, err);
          return <div key={idx}>{idx}Error loading {name}</div>;
        }
      })
    )}
      </main>
    );
  } catch (error) {
    console.error('Error in DynamicPage:', error);
    return <div>Error loading components</div>;
  }
}

export const revalidate = 10000;
