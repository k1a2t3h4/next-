import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../app/CartWrapper';
import { renderSection } from '../utils/renderSection';
interface CartProps {
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

const Cart = ({ data, sections, index }: CartProps) => {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <div className="flex items-center space-x-4">
      <a className="relative text-gray-700 hover:text-primary cursor-pointer" onClick={() => router.push('/cart')}>
        <ShoppingBag/>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </a>
      {sections && sections.map((section, idx) => (
        renderSection && renderSection(section, `${index}-${idx}`)
      ))}
    </div>
  );
};

export default Cart; 