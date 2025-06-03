'use client';

import React, { createContext, useContext } from 'react';

type StateValue = {
  type: string;
  value: any;
  timestamp: number;
};

type DynamicStateValue = {
  stringStates: { [key: string]: StateValue };
  numberStates: { [key: string]: StateValue };
  booleanStates: { [key: string]: StateValue };
  objectStates: { [key: string]: StateValue };
  arrayStates: { [key: string]: StateValue };
  addState: (key: string, type: string, initialValue: any) => void;
  updateState: (key: string, newValue: any) => void;
  removeState: (key: string) => void;
  clearAll: () => void;
  clearByType: (type: string) => void;
  getStateByType: (type: string) => { [key: string]: StateValue };
  getStateByKey: (key: string) => StateValue | null;
  getAllStates: () => DynamicStateValue;
  getStateCount: () => { [key: string]: number };
};

export const DynamicStateContext = createContext<DynamicStateValue | undefined>(undefined);

export const useDynamicState = () => {
  const context = useContext(DynamicStateContext);
  if (!context) throw new Error('useDynamicState must be used within DynamicStateProvider');
  return context;
};

const contextCodeFromDB = `
  const [stringStates, setStringStates] = React.useState({});
  const [numberStates, setNumberStates] = React.useState({});
  const [booleanStates, setBooleanStates] = React.useState({});
  const [objectStates, setObjectStates] = React.useState({});
  const [arrayStates, setArrayStates] = React.useState({});

  const supportedTypes = {
    string: '',
    number: 0,
    boolean: false,
    object: {},
    array: [],
  };

  const getStateMapByType = (type) => {
    switch (type) {
      case 'string': return stringStates;
      case 'number': return numberStates;
      case 'boolean': return booleanStates;
      case 'object': return objectStates;
      case 'array': return arrayStates;
      default: return {};
    }
  };

  const getSetStateByType = (type) => {
    switch (type) {
      case 'string': return setStringStates;
      case 'number': return setNumberStates;
      case 'boolean': return setBooleanStates;
      case 'object': return setObjectStates;
      case 'array': return setArrayStates;
      default: return () => {};
    }
  };

  const addState = (key, type, initialValue) => {
    if (!supportedTypes.hasOwnProperty(type)) {
      console.error('Unsupported type:', type);
      return;
    }

    const stateMap = getStateMapByType(type);
    if (stateMap[key]) {
      console.error('State key already exists:', key);
      return;
    }

    const setState = getSetStateByType(type);
    setState(prev => ({
      ...prev,
      [key]: {
        type,
        value: initialValue,
        timestamp: Date.now()
      }
    }));
  };

  const updateState = (key, newValue) => {
    let found = false;
    Object.keys(supportedTypes).forEach(type => {
      const stateMap = getStateMapByType(type);
      if (stateMap[key]) {
        const setState = getSetStateByType(type);
        setState(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            value: newValue,
            timestamp: Date.now()
          }
        }));
        found = true;
      }
    });
    if (!found) {
      console.error('State key not found:', key);
    }
  };

  const removeState = (key) => {
    Object.keys(supportedTypes).forEach(type => {
      const stateMap = getStateMapByType(type);
      if (stateMap[key]) {
        const setState = getSetStateByType(type);
        setState(prev => {
          const { [key]: _, ...rest } = prev;
          return rest;
        });
      }
    });
  };

  const clearAll = () => {
    setStringStates({});
    setNumberStates({});
    setBooleanStates({});
    setObjectStates({});
    setArrayStates({});
  };

  const clearByType = (type) => {
    if (!supportedTypes.hasOwnProperty(type)) {
      console.error('Unsupported type:', type);
      return;
    }
    const setState = getSetStateByType(type);
    setState({});
  };

  const getStateByType = (type) => {
    return getStateMapByType(type);
  };

  const getStateByKey = (key) => {
    for (const type of Object.keys(supportedTypes)) {
      const stateMap = getStateMapByType(type);
      if (stateMap[key]) {
        return stateMap[key];
      }
    }
    return null;
  };

  const getAllStates = () => ({
    stringStates,
    numberStates,
    booleanStates,
    objectStates,
    arrayStates,
    addState,
    updateState,
    removeState,
    clearAll,
    clearByType,
    getStateByType,
    getStateByKey,
    getAllStates,
    getStateCount
  });

  const getStateCount = () => ({
    string: Object.keys(stringStates).length,
    number: Object.keys(numberStates).length,
    boolean: Object.keys(booleanStates).length,
    object: Object.keys(objectStates).length,
    array: Object.keys(arrayStates).length
  });

  return {
    stringStates,
    numberStates,
    booleanStates,
    objectStates,
    arrayStates,
    addState,
    updateState,
    removeState,
    clearAll,
    clearByType,
    getStateByType,
    getStateByKey,
    getAllStates,
    getStateCount
  };
`;

export const DynamicStateProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = (() => {
    const fn = new Function('React', `"use strict"; ${contextCodeFromDB}`);
    return fn(React);
  })();

  return (
    <DynamicStateContext.Provider value={contextValue}>
      {children}
    </DynamicStateContext.Provider>
  );
};
