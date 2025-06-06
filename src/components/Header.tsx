import React from 'react';
import { renderSection } from '../app/page';

interface HeaderProps {
  data?: {
    builddata?: {
      title?: string;
    };
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: any[];
  index?: string;
}

const Header = ({ data, sections, index }: HeaderProps) => {
  const { builddata } = data || {};

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {sections && sections.map((section, idx) => (
          renderSection(section, `${index}-${idx}`)
        ))}
        
        <div className="flex items-center space-x-4">
          <a href="/" className="text-2xl font-bold text-primary">{builddata?.title || "StyleShop"}</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
