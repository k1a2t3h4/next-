'use client';

import React, { useEffect, useState } from 'react';

interface Section {
  sectionName: string;
  data: Record<string, any>;
  Section?: Section[];
}

interface Props {
  name: string;
  data?: Record<string, any>;
  sections?: Section[];
  index?: string;

}

type DynamicComponent = React.FC<{
  data?: Record<string, any>;
  sections?: Section[];
  index?: string;

}>;

export default function ClientComponent({ name, data, sections, index}: Props) {
  const [Component, setComponent] = useState<DynamicComponent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadComponent() {
      try {
        // const res = await fetch(`/api/compile?name=${name}`);
        // if (!res.ok) {
        //   throw new Error(`Failed to fetch component: ${res.statusText}`);
        // }
        
        // const { code: componentCode } = await res.json();
        // if (!componentCode) {
        //   throw new Error('No component code received');
        // }
        const responsehttp = await fetch(`https://pub-e9fe85ee4a054365808fe57dab43e678.r2.dev/${name}.tsx`);
        const code = await responsehttp.text();
        

        // Create a module object to hold the exports
        const mod = { exports: {} as { default: DynamicComponent } };
        
        // Create a require function that handles all necessary imports
        const requireShim = (modName: string) => {
          switch (modName) {
            case 'react':
              return require('react');
            case '../app/CartWrapper':
              return require('../app/CartWrapper');
            case '../app/AuthWrapper':
              return require('../app/AuthWrapper');
            case '../app/FilterWrapper':
              return require('../app/FilterWrapper');
            case '../app/DynamicStateWrapper':
              return require('../app/DynamicStateWrapper');
            case 'react-icons/ai':
              return require('react-icons/ai');
            case 'lucide-react':
              return require('lucide-react');
            case '@mui/x-data-grid':
              return require('@mui/x-data-grid');
            case '@mui/x-tree-view':
              return require('@mui/x-tree-view');
            case 'next/navigation':
              return require('next/navigation');
            case '@mui/material':
              return require('@mui/material');
            case '../app/page.':
              return require('../app/page')
            default:
              console.warn(`Unknown module requested: ${modName}`);
              return {};
          }
        };

        // Evaluate the component code
        const func = new Function('require', 'module', 'exports', code);
        func(requireShim, mod, mod.exports);

        // Check if we got a valid component
        if (!mod.exports.default) {
          throw new Error('Component did not export a default component');
        }

        setComponent(() => mod.exports.default);
        setError(null);
      } catch (error) {
        console.error(`Failed to load component ${name}:`, error);
        setError(error instanceof Error ? error.message : 'Failed to load component');
        setComponent(null);
      }
    }

    loadComponent();
  }, [name]);

  if (error) {
    return <div suppressHydrationWarning>Error loading {name}: {error}</div>;
  }

  if (!Component) {
    return <div suppressHydrationWarning>Loading {name}...</div>;
  }

  return (
    <div suppressHydrationWarning>
      <Component 
        data={data} 
        sections={sections} 
        index={index}
      />
    </div>
  );
}
