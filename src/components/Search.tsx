import React from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { useDynamicState } from '../app/DynamicStateWrapper';
import { renderSection } from '../utils/renderSection';
interface SearchProps {
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
  index?: string;
}

const Search = ({ data, sections, index }: SearchProps) => {
  const router = useRouter();
  const { getStateByKey, updateState, addState } = useDynamicState();

  // Initialize search state if it doesn't exist
  React.useEffect(() => {
    if (!getStateByKey('searchQuery')) {
      addState('searchQuery', 'string', '');
    }
  }, []);

  const searchQuery = getStateByKey('searchQuery')?.value || '';

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products`);
    }
  };

  return (
    <div className="relative hidden md:block">
      <input
        type="search"
        placeholder="Search..."
        className="w-64 pr-10"
        value={searchQuery}
        onChange={(e) => updateState('searchQuery', e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
      />
      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {sections && sections.map((section, idx) => (
        renderSection && renderSection(section, `${index}-${idx}`)
      ))}
    </div>
  );
};

export default Search; 