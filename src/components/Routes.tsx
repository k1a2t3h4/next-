import React from 'react';
import Link from 'next/link';
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
  index?: string;
}

const Routes = ({ data,index }: RoutesProps) => {

  const { builddata } = data || {};

  return (
    <div className="flex items-center space-x-6">
      {builddata?.routes?.map((route, idx) => (
        
          <Link 
            key={`${index}-route-${idx}`}
            className="text-gray-700 hover:text-primary cursor-pointer" 
            href={route.location}
          >
            {route.name}
          </Link>
        ))
      }

    </div>
  );
};

export default Routes; 