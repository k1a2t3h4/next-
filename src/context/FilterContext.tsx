'use client';

import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface FilterContextType {
  category: string;
  searchTerm: string;
  setCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  filterProducts: (products: Product[]) => Product[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filterProducts = (products: Product[]) => {
    return products.filter(product =>
      (!category || product.category === category) &&
      (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <FilterContext.Provider value={{
      category,
      searchTerm,
      setCategory,
      setSearchTerm,
      filterProducts
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
} 