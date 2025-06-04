'use client';

import React from 'react';
import { Button } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartWrapper';
import { useFilter, Product } from '../FilterWrapper';

interface FeaturedProductsProps {
  data?: {
    builddata?: {
      title?: string;
      viewAllText?: string;
      viewAllLink?: string;
      maxProducts?: number;
    };
  };
}

const FeaturedProducts = ({ data }: FeaturedProductsProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { filteredProducts } = useFilter();
  const { builddata } = data || {};

  const featuredProducts = filteredProducts
    .filter((product: Product) => product.featured)
    .slice(0, builddata?.maxProducts || 4);

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {builddata?.title || "Featured Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product: Product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => addToCart(product, 1)}
                      title="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button 
            variant="outlined" 
            onClick={() => router.push(builddata?.viewAllLink || '/products')}
          >
            {builddata?.viewAllText || "View All Products"}
          </Button>
        </div>
      </div>
    </section>
  );
};

module.exports.default = FeaturedProducts; 