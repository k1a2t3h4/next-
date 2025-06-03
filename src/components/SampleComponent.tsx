'use client';

import React from 'react';

interface SampleComponentProps {
  data?: {
    builddata?: {
      title?: string;
      description?: string;
      items?: string[];
    };
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: string;
    };
  };
}

const SampleComponent: React.FC<SampleComponentProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {data?.builddata?.title && (
        <h2 className="text-2xl font-bold mb-4">{data.builddata.title}</h2>
      )}
      
      {data?.builddata?.description && (
        <p className="text-gray-600 mb-4">{data.builddata.description}</p>
      )}
      
      {data?.builddata?.items && data.builddata.items.length > 0 && (
        <ul className="list-disc pl-5">
          {data.builddata.items.map((item, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SampleComponent; 