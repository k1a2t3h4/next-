'use client';

import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
};

type DynamicComponent = React.FC;

export default function ClientComponent({ name }: Props) {
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
          if (modName === '../app/CartWrapper') {
            return require('../app/CartWrapper'); // Allow it to load properly
          }
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

  return <Component />;
}
