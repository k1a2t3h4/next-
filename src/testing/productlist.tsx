'use client';

import React from 'react';
import { FilterCart, Product } from '../app/FilterWrapper';

export default function ProductList () {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    showFeaturedOnly,
    setShowFeaturedOnly,
    handleSearch,
    applyFilters,
  } = FilterCart();

  // Get unique categories from products
  const categories = ['all', 'tshirts', 'jeans', 'shoes', 'dresses', 'jackets', 'sweaters', 'pants'];

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto p-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 border rounded"
                />
            </div>

            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Category Filter */}
                <div>
                <label className="block mb-2">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    {categories.map((category) => (
                    <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                    ))}
                </select>
                </div>

                {/* Price Range Filter */}
                <div>
                <label className="block mb-2">Price Range:</label>
                <div className="flex gap-2">
                    <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full p-2 border rounded"
                    />
                    <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full p-2 border rounded"
                    />
                </div>
                </div>

                {/* Sort Filter */}
                <div>
                <label className="block mb-2">Sort By:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
                </div>

                {/* Featured Filter */}
                <div className="flex items-center">
                <label className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="w-4 h-4"
                    />
                    Show Featured Only
                </label>
                </div>
            </div>

            {/* Apply Filters Button */}
            <button
                onClick={applyFilters}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Apply Filters
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product: Product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
                    <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.featured && (
                        <span className="bg-yellow-400 text-xs px-2 py-1 rounded">Featured</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">In Stock: {product.inventory}</p>
                    </div>
                </div>
                ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
            )}
            </div>
          </div>
        </main>
      </div>
    
  );
};
