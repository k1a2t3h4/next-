import React from 'react';

interface NestedComponentProps {
  data?: {
    builddata?: {
      title?: string;
      content?: string;
    };
    styles?: Record<string, any>;
    state?: {
      key: string;
      type: string;
      initValue: string;
    };
  };
  sections?: Array<{
    sectionName: string;
    data: Record<string, any>;
    Section?: Array<any>;
  }>;
  renderSection?: (section: any, idx: string) => Promise<React.ReactElement>;

  nestindex?: string;
}

const NestedComponent: React.FC<NestedComponentProps> = ({ data, sections, renderSection, nestindex }) => {
  return (
    <div className="border-2 border-blue-500 p-4 rounded-lg m-4">
      {/* Display main component data */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-blue-600">
          {data?.builddata?.title || 'Default Title'}
        </h2>
        <p className="text-gray-700 mt-2">
          {data?.builddata?.content || 'Default Content'}
        </p>
      </div>

      {sections && sections.length > 0 && renderSection && (
        <div className="mt-4 pl-4 border-l-2 border-blue-300">
          <h3 className="text-lg font-semibold mb-2">Nested Sections:</h3>
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              {renderSection(section, `${nestindex}-${index}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NestedComponent; 