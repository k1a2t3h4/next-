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
  Section?: Section[];
}

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

// Update the ClientComponent props
// interface ClientComponentProps {
//   name: string;
//   data?: Record<string, any>;
//   sections?: Section[];
// }

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

// Get the page list from R2
// async function getPagesFromR2() {
//   const command = new GetObjectCommand({
//     Bucket: R2_BUCKET_NAME,
//     Key: 'pages.json',
//   });

//   const response = await r2Client.send(command);
//   const pagesData = await response.Body?.transformToString();

//   if (!pagesData) throw new Error('Pages data not found');

//   return JSON.parse(pagesData);
// }

// Helper function to render a section and its subsections recursively
async function renderSection(section: Section, idx: string) {
  try {
    const key = `${section.sectionName}.tsx`;

    // Step 1: Get raw source code
    const rawCode = await getRawComponentFromR2(key);

    // Step 2: Detect client component
    const client = isClientComponent(rawCode);
    if (client) {
      return (
        <div key={idx} className="section-container" suppressHydrationWarning>
          <ClientComponent 
            name={section.sectionName}
            data={section.data}
            sections={section.Section}
            index={idx}
          />
        </div>
      );
    } else {
      // Step 3: Compile the raw code to JS
      const compiledCode = await compileComponent(rawCode);
      
      // Step 4: Evaluate the compiled code with proper require shim
      const Component = evaluateComponent(compiledCode);

      // Step 5: Create dynamic wrapper with SSR option
      const DynamicComponent = dynamic(
        () => Promise.resolve(({ Component, data, sections }: { 
          Component: React.ComponentType<ComponentProps>,
          data?: Record<string, any>,
          sections?: Section[],
        }) => <Component data={data} sections={sections} />),
        { ssr: true }
      );

      return (
        <div key={idx} className="section-container" suppressHydrationWarning>
          <DynamicComponent
            Component={Component}
            data={section.data}
            sections={section.Section}
          />
        </div>
      );
    }
  } catch (err) {
    console.error(`Failed to load component ${section.sectionName}:`, err);
    return <div key={idx} suppressHydrationWarning>Error loading {section.sectionName}</div>;
  }
}

export default async function Home() {
  try {
    // const pagesData = await getPagesFromR2();
    const pagesData = [
      // {
      //   sectionName: "Header",
      //   data: {
      //     builddata: {
      //       title: "StyleShop",
      //       routes: [
      //         { name: "Home", location: "/" },
      //         { name: "Products", location: "/products" },
      //         { name: "Categories", location: "/categories" },
      //         { name: "Profile", location: "/profile", authRequired: true },
      //         { name: "My Orders", location: "/orders", authRequired: true }
      //       ]
      //     },
      //     styles: {},
      //     state: {
      //       key: "",
      //       type: "",
      //       initValue: ""
      //     }
      //   }
      // },
      // {
      //   sectionName: "FeaturedProducts",
      //   data: {
      //     builddata: {
      //       title: "Featured Products",
      //       viewAllText: "View All Products",
      //       viewAllLink: "/products",
      //       maxProducts: 4
      //     },
      //     styles: {},
      //     state: {
      //       key: "",
      //       type: "",
      //       initValue: ""
      //     }
      //   }
      // },
      {
        sectionName: "HeroBanner",
        data: {
          builddata: {
            title: "Welcome to StyleShop",
            subtitle: "Your one-stop shop for fashion",
            buttonText: "Shop Now",
            buttonLink: "/products"
          },
          styles: {},
          state: {
            key: "",
            type: "",
            initValue: ""
          }
        }
      },
      
    //   {
    //     sectionName: "AddToCartButton",
    //     data: {
    //       builddata: {
    //         title: "Welcome to My Component",
    //         description: "This is a sample component showing how to use data",
    //         items: [
    //           "First item in the list",
    //           "Second item in the list",
    //           "Third item in the list"
    //         ]
    //       },
    //       styles: {},
    //       state: {
    //         key: "",
    //         type: "",
    //         initValue: ""
    //       }
    //     }
    //   },
    //   {
    //   sectionName: "CartItemCount",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "test1",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "test2",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "statevaluechecker",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },  
    // {
    //   sectionName: "authverify",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // }
    ];
  //   const command = new GetObjectCommand({
  //     Bucket: R2_BUCKET_NAME_TSX,
  //     Key: `${slugPath}.json`,
  //   });

  //   const response = await r2Client.send(command);
  //   const pageData = await response.Body?.transformToString();
    
  //   if (!pageData) {
  //     notFound();
  //   }

  //   const sections = JSON.parse(pageData);

  //   return (
  //     <div className="dynamic-page">
  //       {sections.map((section: ComponentData, idx: number) => (
  //         <React.Fragment key={idx}>
  //           {renderSection(section, idx.toString())}
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // } catch (error) {
  //   console.error('Error in DynamicPage:', error);
  //   notFound();
    return (
      <main className="min-h-screen" suppressHydrationWarning>
        {await Promise.all(pagesData.map((section, idx) => renderSection(section, idx.toString())))}
      </main>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return <div>Failed to load components</div>;
  }
}

export const revalidate = 1000;
