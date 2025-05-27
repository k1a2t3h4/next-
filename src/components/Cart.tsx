'use client';

import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg">${total.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 