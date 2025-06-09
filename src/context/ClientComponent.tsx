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
        const response = await fetch(`https://pub-aac58bb0a497454096a1fcf0b6aa06cc.r2.dev/${name}.js`);
        const code = await response.text();

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
            case '../utils/renderSection':
              return require('../utils/renderSection');
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
            case 'framer-motion':
              return require('framer-motion'); 
            case '@mui/material':
              const Mui = require('@mui/material');
              return Mui;
            case 'next/script':
               return require('next/script')
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
