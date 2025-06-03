'use client'

import React from 'react';
import { products } from '../data/products';
import AddToCartButton from './AddToCartButton';

export default function ProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
} 