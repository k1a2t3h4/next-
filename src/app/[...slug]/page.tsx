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
interface Section {
  sectionName: string;
  data: Record<string, any>;
  Section?: Section[];
}
interface ComponentData {
  sectionName: string;
  data: {
    builddata: Record<string, any>;
    styles: Record<string, any>;
    state: {
      key: string;
      type: string;
      initValue: string;
    };
  };
  sections: Section[];
}
interface ComponentProps {
  data?: Record<string, any>;
  sections?: Section[];
}
async function renderSection(component: ComponentData, idx: string) {
try {
  const key = `${component.sectionName}.tsx`;

  // Step 1: Get raw source code
  const rawCode = await getRawComponentFromR2(key);

  // Step 2: Detect client component
  const client = isClientComponent(rawCode);
  if(client) {
    return (
      <div key={idx} className="section-container" suppressHydrationWarning>
      <ClientComponent 
        name={component.sectionName}
        data={component.data}
        index={idx}
      />
    </div>
  )
  } else {
    // Step 3: Compile the raw code to JS
    const compiledCode = await compileComponent(rawCode);
    
    // Step 4: Evaluate the compiled code with proper require shim
    const Component = evaluateComponent(compiledCode)

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
    <div key={idx} suppressHydrationWarning><DynamicComponent Component={Component} data={component.data} sections={component.sections}/></div>)
  }
} catch (err) {
  console.error(`Failed to load component ${component.sectionName}:`, err);
  return <div key={idx} suppressHydrationWarning>Error loading {component.sectionName}</div>;
}
}

export default async function DynamicPage(props: PageProps) {
  const { params } = props;
  const { slug } = params;
  const slugPath = (slug || []).join('/');

  try {
    // Get pages data from R2
    const data = {
      "not-found": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "blog": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "categories": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "products": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
        {
          sectionName: "productlist",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "products/product1/detail": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "cart": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
              routes: [
                { name: "Home", location: "/" },
                { name: "Products", location: "/products" },
                { name: "Categories", location: "/categories" },
                { name: "Profile", location: "/profile", authRequired: true },
                { name: "My Orders", location: "/orders", authRequired: true }
              ]
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
        {
          sectionName: "CartPage",
          data: {
            builddata: {
              title: "Shopping Cart",
              emptyCartTitle: "Your cart is empty",
              emptyCartMessage: "Add items to your cart to see them here.",
              continueShoppingText: "Continue Shopping",
              continueShoppingLink: "/products",
              orderSummaryTitle: "Order Summary",
              shippingText: "Shipping",
              shippingPrice: "Free",
              subtotalText: "Subtotal",
              totalText: "Total",
              checkoutButtonText: "Proceed to Checkout"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        }
      ],
      "login":[
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
        {
          sectionName: "LoginPage",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ]
    } as unknown as { [key: string]: ComponentData[] };
    const componentList = data[slugPath];

    if (!componentList) {
      notFound();
    }

    // Load components from R2
    return (
      <main className="min-h-screen" suppressHydrationWarning>
        {await Promise.all(
          componentList.map(async (component: ComponentData, idx: number) => renderSection(component,idx.toString())))}
      </main>
    );
  } catch (error) {
    console.error('Error in DynamicPage:', error);
    return <div>Error loading components</div>;
  }
}

export const revalidate = 10000;
