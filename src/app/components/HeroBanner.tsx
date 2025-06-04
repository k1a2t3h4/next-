'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface HeroBannerProps {
  data?: {
    builddata?: {
      title?: string;
      subtitle?: string;
      buttonText?: string;
      buttonLink?: string;
    };
  };
}

const HeroBanner = ({ data }: HeroBannerProps) => {
  const router = useRouter();
  const { builddata } = data || {};
  
  return (
    <section className="relative bg-gray-900 text-white py-24">
      <div className="container mx-auto px-4 flex flex-col items-center text-center z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {builddata?.title || "Welcome to StyleShop"}
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          {builddata?.subtitle || "Your one-stop shop for fashion"}
        </p>
        <Button 
          onClick={() => router.push(builddata?.buttonLink || '/products')}
          className="bg-white text-gray-900 hover:bg-gray-100"
        >
          {builddata?.buttonText || "Shop Now"}
        </Button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"></div>
    </section>
  );
};

module.exports.default = HeroBanner;

