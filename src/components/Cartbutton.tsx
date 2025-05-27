'use client'
import { useCart } from '../context/CartContext';


export default function ProductList(product:any) {
  const { addToCart } = useCart();


  return (
        <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Add to Cart
        </button>
  );
} 