'use client';

import React from 'react';
import { useDynamicState } from '../app/DynamicStateWrapper';

export default function StateValueViewer() {
  const {
    stringStates,
    numberStates,
    booleanStates,
    objectStates,
    arrayStates,
    getStateByKey
  } = useDynamicState();

  const [selectedKey, setSelectedKey] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('all');

  // Get all available keys from all state types
  const getAllKeys = () => {
    const keys = {
      string: Object.keys(stringStates),
      number: Object.keys(numberStates),
      boolean: Object.keys(booleanStates),
      object: Object.keys(objectStates),
      array: Object.keys(arrayStates)
    };

    if (selectedType === 'all') {
      return [...keys.string, ...keys.number, ...keys.boolean, ...keys.object, ...keys.array];
    }

    return keys[selectedType as keyof typeof keys] || [];
  };

  // Get state value by key
  const getStateValue = (key: string) => {
    const state = getStateByKey(key);
    if (!state) return null;

    return {
      type: state.type,
      value: state.value,
      timestamp: new Date(state.timestamp).toLocaleString()
    };
  };

  const stateValue = selectedKey ? getStateValue(selectedKey) : null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">State Value Viewer</h1>

      {/* Key Selection */}
      <div className="mb-6 p-4 border rounded">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Filter by Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="all">All Types</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
              <option value="array">Array</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Select State Key</label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a key</option>
              {getAllKeys().map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>

        {/* State Value Display */}
        {stateValue && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-semibold mb-2">State Value Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Key:</div>
                <div className="text-gray-600">{selectedKey}</div>
              </div>
              <div>
                <div className="font-medium">Type:</div>
                <div className="text-gray-600">{stateValue.type}</div>
              </div>
              <div className="col-span-2">
                <div className="font-medium">Value:</div>
                <pre className="mt-1 p-2 bg-white rounded border text-gray-600 overflow-auto">
                  {typeof stateValue.value === 'object' 
                    ? JSON.stringify(stateValue.value, null, 2)
                    : stateValue.value.toString()}
                </pre>
              </div>
              <div className="col-span-2">
                <div className="font-medium">Last Updated:</div>
                <div className="text-gray-600">{stateValue.timestamp}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access Links */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Quick Access by Type:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries({
              string: stringStates,
              number: numberStates,
              boolean: booleanStates,
              object: objectStates,
              array: arrayStates
            }).map(([type, states]) => (
              <div key={type} className="p-2 bg-gray-100 rounded">
                <div className="font-medium">{type}</div>
                <div className="text-sm text-gray-600">
                  {Object.keys(states).length} states
                </div>
                <div className="mt-1">
                  {Object.keys(states).map(key => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedType(type);
                        setSelectedKey(key);
                      }}
                      className="block text-blue-500 hover:text-blue-700 text-sm"
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 