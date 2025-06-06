'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/AuthWrapper';

interface RoutesProps {
  data?: {
    builddata?: {
      routes?: Array<{
        name: string;
        location: string;
        authRequired?: boolean;
      }>;
    };
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: any[];
  renderSection?: (section: any, idx: string) => Promise<JSX.Element>;
  index?: string;
}

const Routes = ({ data, sections, renderSection, index }: RoutesProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { builddata } = data || {};

  return (
    <div className="flex items-center space-x-6">
      {builddata?.routes?.map((route, idx) => (
        (!route.authRequired || user) && (
          <a 
            key={`${index}-route-${idx}`}
            className="text-gray-700 hover:text-primary cursor-pointer" 
            onClick={() => router.push(route.location)}
          >
            {route.name}
          </a>
        )
      ))}
      {sections && sections.map((section, idx) => (
        renderSection && renderSection(section, `${index}-${idx}`)
      ))}
    </div>
  );
};

export default Routes; 