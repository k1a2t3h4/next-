'use client';

import React from 'react';
import { MenuIcon } from 'lucide-react';
import { useDynamicState } from '../app/DynamicStateWrapper';

interface MenuProps {
  data?: {
    builddata?: Record<string, any>;
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

const Menu = ({ data, sections, renderSection, index }: MenuProps) => {
  const { getStateByKey, updateState, addState } = useDynamicState();

  // Initialize menu state if it doesn't exist
  React.useEffect(() => {
    if (!getStateByKey('menuOpen')) {
      addState('menuOpen', 'boolean', false);
    }
  }, []);

  const menuOpen = getStateByKey('menuOpen')?.value || false;

  return (
    <div className="flex items-center space-x-4">
      <button 
        className="lg:hidden text-gray-700" 
        onClick={() => updateState('menuOpen', !menuOpen)}
      >
        <MenuIcon/>
      </button>
      {sections && sections.map((section, idx) => (
        <div key={`${index}-${idx}`} className={`lg:flex items-center space-x-6 ${menuOpen ? 'absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4' : 'hidden'}`}>
          {renderSection && renderSection(section, `${index}-${idx}`)}
        </div>
      ))}
    </div>
  );
};

export default Menu; 