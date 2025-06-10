import React from 'react';
import Link from 'next/link';
import { useAuth } from '../app/AuthWrapper';
import { useDynamicState } from '../app/DynamicStateWrapper';

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

  const { user } = useAuth();
  const { getStateByKey } = useDynamicState();
  const { builddata } = data || {};
  const menuOpen = getStateByKey('menuOpen')?.value || false;
  return (
    <div className="flex items-center space-x-6">
      <div className={`lg:flex items-center space-x-6 ${menuOpen ? 'absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4' : 'hidden'}`}>
        {builddata?.routes?.map((route, idx) => (
          (!route.authRequired || user) && (
            <Link
              key={`${index}-route-${idx}`}
              className="text-gray-700 hover:text-primary cursor-pointer" 
              href={route.location}
            >
              {route.name}
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default Routes; 