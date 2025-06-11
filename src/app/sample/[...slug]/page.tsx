'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type VariantKey = 'bone' | 'black';

const productData = {
  name: "Coastal Terry Button Up",
  baseHandle: "pant",
  variants: {
    bone: {
      name: "Bone",
      price: "₹5,500",
      image: "/images/bone.jpg",
    },
    black: {
      name: "Black",
      price: "₹5,500",
      image: "/images/black.jpg",
    },
  },
};

export default function ProductPage({ params }: { params: { slug: string[] } }) {
  const router = useRouter();
  const slug = params.slug.join('-');

  const [variantKey, setVariantKey] = useState<VariantKey>(() => {
    const parts = slug?.split('-');
    return parts?.[parts.length - 1] as VariantKey;
  });

  const variant = useMemo(() => {
    return productData.variants[variantKey];
  }, [variantKey]);

  const handleVariantChange = (key: VariantKey) => {
    const newSlug = `${productData.baseHandle}-${key}`;
    router.push(`/sample/${newSlug}`);
    setVariantKey(key);
  };

  return (
    <div>
      <h1>{productData.name} - {variant?.name}</h1>
      <img src={variant?.image} alt={variant?.name} width={300} />
      <p>Price: {variant?.price}</p>

      <div>
        {Object.entries(productData.variants).map(([key, v]) => (
          <button
            key={key}
            onClick={() => handleVariantChange(key as VariantKey)}
            style={{
              margin: '5px',
              fontWeight: key === variantKey ? 'bold' : 'normal',
            }}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
