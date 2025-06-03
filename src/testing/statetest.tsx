'use client';

import React from 'react';
import { useDynamicState } from '../app/DynamicStateWrapper';

export default function StateValueViewer() {
  const {
    getStateByKey
  } = useDynamicState();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">State Value Viewer</h1>

      
        {getStateByKey("abcd") && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-semibold mb-2">State Value Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium">value</div>
                <div className="text-gray-600">{getStateByKey("abcd")?.value}</div>
              </div>
              <div>
                <div className="font-medium">Type:</div>
                <div className="text-gray-600">{getStateByKey("abcd")?.type}</div>
              </div>
              <div className="col-span-2">
                <div className="font-medium">Last Updated:</div>
                <div className="text-gray-600">{getStateByKey("abcd")?.timestamp}</div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
} 