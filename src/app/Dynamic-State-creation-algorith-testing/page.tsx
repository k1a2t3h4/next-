'use client';

import React from 'react';
import { useDynamicState } from '../../app/DynamicStateWrapper';

export default function DynamicStateDemo (){
  const {
    addState,
    updateState,
    removeState,
    clearAll,
    clearByType,
    getStateByType,
    getStateByKey,
    getAllStates,
    getStateCount,
    stringStates,
    numberStates,
    booleanStates,
    objectStates,
    arrayStates
  } = useDynamicState();

  // Local state for input fields
  const [newKey, setNewKey] = React.useState('');
  const [newValue, setNewValue] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('string');
  const [searchKey, setSearchKey] = React.useState('');

  // Update state values
  const [updateStringKey, setUpdateStringKey] = React.useState('');
  const [updateStringValue, setUpdateStringValue] = React.useState('');
  const [updateNumberKey, setUpdateNumberKey] = React.useState('');
  const [updateNumberValue, setUpdateNumberValue] = React.useState('');
  const [updateBooleanKey, setUpdateBooleanKey] = React.useState('');
  const [updateBooleanValue, setUpdateBooleanValue] = React.useState('');
  const [updateObjectKey, setUpdateObjectKey] = React.useState('');
  const [updateObjectValue, setUpdateObjectValue] = React.useState('');
  const [updateArrayKey, setUpdateArrayKey] = React.useState('');
  const [updateArrayValue, setUpdateArrayValue] = React.useState('');

  // Example of adding different types of states
  const handleAddState = () => {
    let parsedValue: any = newValue;
    
    // Parse value based on type
    switch (selectedType) {
      case 'number':
        parsedValue = Number(newValue);
        break;
      case 'boolean':
        parsedValue = newValue.toLowerCase() === 'true';
        break;
      case 'object':
        try {
          parsedValue = JSON.parse(newValue);
        } catch {
          parsedValue = {};
        }
        break;
      case 'array':
        try {
          parsedValue = JSON.parse(newValue);
        } catch {
          parsedValue = [];
        }
        break;
    }

    addState(newKey, selectedType, parsedValue);
    setNewKey('');
    setNewValue('');
  };

  // Update handlers for each type
  const handleUpdateString = () => {
    if (updateStringKey && stringStates[updateStringKey]) {
      updateState(updateStringKey, updateStringValue);
      setUpdateStringValue('');
    }
  };

  const handleUpdateNumber = () => {
    if (updateNumberKey && numberStates[updateNumberKey]) {
      updateState(updateNumberKey, Number(updateNumberValue));
      setUpdateNumberValue('');
    }
  };

  const handleUpdateBoolean = () => {
    if (updateBooleanKey && booleanStates[updateBooleanKey]) {
      updateState(updateBooleanKey, updateBooleanValue.toLowerCase() === 'true');
      setUpdateBooleanValue('');
    }
  };

  const handleUpdateObject = () => {
    if (updateObjectKey && objectStates[updateObjectKey]) {
      try {
        const parsedValue = JSON.parse(updateObjectValue);
        updateState(updateObjectKey, parsedValue);
        setUpdateObjectValue('');
      } catch (e) {
        alert('Invalid JSON object');
      }
    }
  };

  const handleUpdateArray = () => {
    if (updateArrayKey && arrayStates[updateArrayKey]) {
      try {
        const parsedValue = JSON.parse(updateArrayValue);
        if (Array.isArray(parsedValue)) {
          updateState(updateArrayKey, parsedValue);
          setUpdateArrayValue('');
        } else {
          alert('Value must be an array');
        }
      } catch (e) {
        alert('Invalid JSON array');
      }
    }
  };

  // Example of removing a state
  const handleRemoveState = (key: string) => {
    removeState(key);
  };

  // Example of clearing all states of a specific type
  const handleClearByType = (type: string) => {
    clearByType(type);
  };

  // Example of getting a specific state
  const handleSearchState = () => {
    const state = getStateByKey(searchKey);
    if (state) {
      alert(`Found state: ${JSON.stringify(state)}`);
    } else {
      alert('State not found');
    }
  };

  // Example of getting state count
  const stateCounts = getStateCount();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic State Demo</h1>

      {/* Add New State */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Add New State</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="State Key"
            className="border p-2 rounded"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="State Value"
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddState}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add State
          </button>
        </div>
      </div>

      {/* Update States Section */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Update States</h2>
        
        {/* Update String States */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Update String State</h3>
          <div className="flex gap-2">
            <select
              value={updateStringKey}
              onChange={(e) => setUpdateStringKey(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select a string state</option>
              {Object.keys(stringStates).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <input
              type="text"
              value={updateStringValue}
              onChange={(e) => setUpdateStringValue(e.target.value)}
              placeholder="New string value"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={handleUpdateString}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>

        {/* Update Number States */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Update Number State</h3>
          <div className="flex gap-2">
            <select
              value={updateNumberKey}
              onChange={(e) => setUpdateNumberKey(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select a number state</option>
              {Object.keys(numberStates).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <input
              type="number"
              value={updateNumberValue}
              onChange={(e) => setUpdateNumberValue(e.target.value)}
              placeholder="New number value"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={handleUpdateNumber}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>

        {/* Update Boolean States */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Update Boolean State</h3>
          <div className="flex gap-2">
            <select
              value={updateBooleanKey}
              onChange={(e) => setUpdateBooleanKey(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select a boolean state</option>
              {Object.keys(booleanStates).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <select
              value={updateBooleanValue}
              onChange={(e) => setUpdateBooleanValue(e.target.value)}
              className="border p-2 rounded flex-1"
            >
              <option value="">Select new value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button
              onClick={handleUpdateBoolean}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>

        {/* Update Object States */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Update Object State</h3>
          <div className="flex gap-2">
            <select
              value={updateObjectKey}
              onChange={(e) => setUpdateObjectKey(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select an object state</option>
              {Object.keys(objectStates).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <textarea
              value={updateObjectValue}
              onChange={(e) => setUpdateObjectValue(e.target.value)}
              placeholder="New object value (JSON)"
              className="border p-2 rounded flex-1"
              rows={3}
            />
            <button
              onClick={handleUpdateObject}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>

        {/* Update Array States */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Update Array State</h3>
          <div className="flex gap-2">
            <select
              value={updateArrayKey}
              onChange={(e) => setUpdateArrayKey(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select an array state</option>
              {Object.keys(arrayStates).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <textarea
              value={updateArrayValue}
              onChange={(e) => setUpdateArrayValue(e.target.value)}
              placeholder="New array value (JSON)"
              className="border p-2 rounded flex-1"
              rows={3}
            />
            <button
              onClick={handleUpdateArray}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Search State */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Search State</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter state key to search"
            className="border p-2 rounded"
          />
          <button
            onClick={handleSearchState}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* State Counts */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">State Counts</h2>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(stateCounts).map(([type, count]) => (
            <div key={type} className="p-2 bg-gray-100 rounded">
              <div className="font-semibold">{type}</div>
              <div>{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Display States by Type */}
      <div className="grid grid-cols-2 gap-4">
        {/* String States */}
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">String States</h2>
            <button
              onClick={() => handleClearByType('string')}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>
          {Object.entries(stringStates).map(([key, value]) => (
            <div key={key} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="font-semibold">{key}</div>
              <div className="text-gray-600">{value.value}</div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(value.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveState(key)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Number States */}
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Number States</h2>
            <button
              onClick={() => handleClearByType('number')}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>
          {Object.entries(numberStates).map(([key, value]) => (
            <div key={key} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="font-semibold">{key}</div>
              <div className="text-gray-600">{value.value}</div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(value.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveState(key)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Boolean States */}
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Boolean States</h2>
            <button
              onClick={() => handleClearByType('boolean')}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>
          {Object.entries(booleanStates).map(([key, value]) => (
            <div key={key} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="font-semibold">{key}</div>
              <div className="text-gray-600">{value.value.toString()}</div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(value.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveState(key)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Object States */}
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Object States</h2>
            <button
              onClick={() => handleClearByType('object')}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>
          {Object.entries(objectStates).map(([key, value]) => (
            <div key={key} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="font-semibold">{key}</div>
              <pre className="text-gray-600 text-sm">
                {JSON.stringify(value.value, null, 2)}
              </pre>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(value.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveState(key)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Array States */}
        <div className="p-4 border rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Array States</h2>
            <button
              onClick={() => handleClearByType('array')}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Clear All
            </button>
          </div>
          {Object.entries(arrayStates).map(([key, value]) => (
            <div key={key} className="mb-2 p-2 bg-gray-50 rounded">
              <div className="font-semibold">{key}</div>
              <pre className="text-gray-600 text-sm">
                {JSON.stringify(value.value, null, 2)}
              </pre>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(value.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveState(key)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      <div className="mt-4">
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All States
        </button>
      </div>
    </div>
  );
};

