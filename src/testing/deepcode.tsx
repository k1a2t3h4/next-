import React from 'react';
import { useDynamicState } from '../app/DynamicStateWrapper';
import { motion } from 'framer-motion';
import { renderSection } from '../utils/renderSection';

interface ProductFilterPageProps {
  data?: {
    builddata?: {
      title?: string;
      subtitle?: string;
    };
    styles?: {
      theme?: string;
      animationIntensity?: number;
    };
    state?: {
      key: string;
      type: string;
      initValue: any;
    };
  };
  sections?: any[];
  index?: string;
}

const ProductFilterPage = ({ data, sections, index }: ProductFilterPageProps) => {
  const { builddata, styles } = data || {};
  const { addState, updateState, getStateByKey } = useDynamicState();
  
  // Initialize state
  React.useEffect(() => {
    if (!getStateByKey('filterState')) {
      addState('filterState', 'object', {
        category: 'all',
        priceRange: [0, 500],
        sortBy: 'featured',
        searchQuery: ''
      });
    }
  }, []);

  // Apply theme
  const getThemeClass = () => {
    switch(styles?.theme) {
      case 'gradient':
        return 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50';
      case 'dark':
        return 'bg-gray-900 text-white';
      default:
        return 'bg-white';
    }
  };

  return (
    <motion.div 
      className={`min-h-screen py-12 ${getThemeClass()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
            whileHover={{ scale: 1.02 }}
          >
            {builddata?.title || "Discover Amazing Products"}
          </motion.h1>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            {builddata?.subtitle || "Filter and find exactly what you need"}
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {sections && sections.map((section, idx) => (
            renderSection(section, `${index}-${idx}`)
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFilterPage;