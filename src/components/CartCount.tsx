'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartCount() {
  const { cartItems } = useCart();

  return (
    <Link href="/cart" className="hover:text-blue-600 relative">
        Cart
        {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartItems.length}
        </span>
        )}
    </Link>
  );
} 