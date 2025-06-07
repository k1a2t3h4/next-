import dynamic from 'next/dynamic';
import React from 'react';
import ClientComponent from '../context/ClientComponent';

interface ComponentProps {
  data?: {
    builddata?: Record<string, any>;
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: Section[];

}
// Add these interfaces at the top of the file after the imports
interface Section {
  sectionName: string;
  data: {
    builddata?: Record<string, any>;
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: Section[];
  client?: string;
}
// Update the ClientComponent props
// interface ClientComponentProps {
//   name: string;
//   data?: Record<string, any>;
//   sections?: Section[];
//   index: string;
//   renderSection: (section: Section, idx: string) => Promise<JSX.Element>;
// }

// Load a .tsx file from R2 and return the raw code (not compiled)
async function getRawComponentFromR2(key: string): Promise<string> {
  // const command = new GetObjectCommand({
  //   Bucket: R2_BUCKET_NAME_TSX,
  //   Key: key,
  // });

  // const response = await r2Client.send(command);
  // const componentCode = await response.Body?.transformToString();

  // if (!componentCode) throw new Error('Component code not found');
  const responsehttp = await fetch(`https://pub-aac58bb0a497454096a1fcf0b6aa06cc.r2.dev/${key}`);
  const code = await responsehttp.text();
  
  return code;
}

// Check if component source contains 'use client' directive at the top

// Compile TSX code to JS (CommonJS)


// Evaluate compiled JS and return the default React component
function evaluateComponent(code: string): React.ComponentType {
  const module = { exports: {} as { default: React.ComponentType } };
  // Conditionally import hooks only if client component
  const requireShim = (mod: string) => {
    if (mod === 'react') return require('react')
    if (mod === 'next/link') return require('next/link');
    if (mod === '../app/page') return require('../utils/renderSection');
    if (mod === '../utils/renderSection') return require('../utils/renderSection');
    throw new Error(`Cannot resolve module: ${mod}`);
  };
  const func = new Function('require', 'exports', 'module', code);
  func(requireShim, module.exports, module);

  return module.exports.default;
}

export async function renderSection(section: Section, idx: string) {
  try {

    // Step 2: Check if it's a client component based on the client property
    if (section.client === "yes") {
      return (
        <div key={idx} className="section-container" suppressHydrationWarning>
          <ClientComponent 
            name={section.sectionName}
            data={section.data}
            sections={section.sections}
            index={idx}
          />
        </div>
      );
    } else {
      // Step 3: Compile the raw code to JS
      const key = `${section.sectionName}.js`;

      // Step 1: Get raw source code
      const rawCode = await getRawComponentFromR2(key);

      // Step 4: Evaluate the compiled code with proper require shim
      const Component = evaluateComponent(rawCode);

      // Step 5: Create dynamic wrapper with SSR option
      const DynamicComponent = dynamic(
        () => Promise.resolve(({ Component, data, sections}: { 
          Component: React.ComponentType<ComponentProps>,
          data?: Record<string, any>,
          sections?: Section[],
        }) => <Component data={data} sections={sections}/>),
        { ssr: true }
      );

      return (
        <div key={idx} className="section-container" suppressHydrationWarning>
          <DynamicComponent
            Component={Component}
            data={section.data}
            sections={section.sections}
          />
        </div>
      );
    }
  } catch (err) {
    console.error(`Failed to load component ${section.sectionName}:`, err);
    return <div key={idx} suppressHydrationWarning>Error loading {section.sectionName}</div>;
  }
}