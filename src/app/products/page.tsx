'use client';

import React from 'react';
import { FilterProvider } from '../FilterWrapper';
import ProductList from '../components/ProductList';

export default function ProductsPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <ProductList />
          </div>
        </main>
      </div>
    </FilterProvider>
  );
} 