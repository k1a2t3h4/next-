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
  nestindex?: string;
  renderedChildren?: JSX.Element[];
}

type DynamicComponent = React.FC<{
  data?: Record<string, any>;
  sections?: Section[];
  index?:string;
}>;

export default function ClientComponent({ name, data, sections,index}: Props) {
  const [Component, setComponent] = useState<DynamicComponent | null>(null);

  useEffect(() => {
    async function loadComponent() {
      const res = await fetch(`/api/compile?name=${name}`);
      const { code: componentCode } = await res.json();

      const mod = { exports: {} as { default: DynamicComponent } };
      const func = new Function('require', 'module', 'exports', componentCode);
      func(
        (modName: string) => {
          if (modName === 'react') return require('react');
          if (modName === '../app/CartWrapper') return require('../app/CartWrapper');
          if (modName === '../app/AuthWrapper') return require('../app/AuthWrapper');
          if (modName === '../app/FilterWrapper') return require('../app/FilterWrapper');
          if (modName === '../app/DynamicStateWrapper') return require('../app/DynamicStateWrapper');
          if (modName === 'next/navigation') return require('next/navigation');
          return {};
        },
        mod,
        mod.exports
      );
      
      setComponent(() => mod.exports.default);
    }

    loadComponent();
  }, [name]);

  if (!Component) return <div>Loading component...</div>;

  return <Component data={data} sections={sections} index={index} />;
}
