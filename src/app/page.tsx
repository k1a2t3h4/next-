// src/app/page.tsx
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import dynamic from 'next/dynamic';
import * as esbuild from 'esbuild';
import React from 'react';
import ClientComponent from '../context/ClientComponent';

// Validate environment variables
const R2_BUCKET_NAME_TSX = process.env.R2_BUCKET_NAME_TSX;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_BUCKET_NAME_TSX || !R2_BUCKET_NAME) {
  throw new Error('Missing required environment variables: R2_BUCKET_NAME_TSX and R2_BUCKET_NAME must be set');
}

// Load a .tsx file from R2 and return the raw code (not compiled)
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

// Check if component source contains 'use client' directive at the top
function isClientComponent(code: string): boolean {
  const firstLines = code.split('\n').slice(0, 5).map(line => line.trim());
  return firstLines.includes(`'use client';`) || firstLines.includes(`"use client";`);
}

// Compile TSX code to JS (CommonJS)
async function compileComponent(code: string): Promise<string> {
  const compiled = await esbuild.transform(code, {
    loader: 'tsx',
    format: 'cjs',
    target: 'es2020',
  });

  return compiled.code;
}

// Evaluate compiled JS and return the default React component
function evaluateComponent(code: string, isClient: boolean): React.ComponentType {
  const module = { exports: {} as { default: React.ComponentType } };
  // Conditionally import hooks only if client component
  const requireShim = (mod: string) => {
    if (mod === 'react') {
      const reactModule = require('react');
      if (isClient) {
        // Return React with hooks (this actually is the same as react import, but just to illustrate)
        return {
          ...reactModule,
          useState: reactModule.useState,
          useEffect: reactModule.useEffect,
          // add other hooks if needed here
        };
      } else {
        // Server component: just React
        return reactModule;
      }
    }
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
    Bucket: R2_BUCKET_NAME,
    Key: 'pages.json',
  });

  const response = await r2Client.send(command);
  const pagesData = await response.Body?.transformToString();

  if (!pagesData) throw new Error('Pages data not found');

  return JSON.parse(pagesData);
}

export default async function Home() {
  try {
    // const pagesData = await getPagesFromR2();
    const pagesData={
      "": ["Header","AddToCartButton","CartItemCount"]
    } 
    const componentList = pagesData[''] || ['Header', 'Home'];

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
            const Component = evaluateComponent(compiledCode, client)

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
    console.error('Error loading page:', error);
    return <div>Failed to load components</div>;
  }
}

export const revalidate = 100;
