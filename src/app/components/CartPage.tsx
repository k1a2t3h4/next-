import React from 'react';

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartWrapper';

interface CartPageProps {
  data?: {
    builddata?: {
      title?: string;
      emptyCartTitle?: string;
      emptyCartMessage?: string;
      continueShoppingText?: string;
      continueShoppingLink?: string;
      orderSummaryTitle?: string;
      shippingText?: string;
      shippingPrice?: string;
      subtotalText?: string;
      totalText?: string;
      checkoutButtonText?: string;
    };
  };
}

const CartPage = ({ data }: CartPageProps) => {
  const router = useRouter();
  const { 
    items, 
    totalItems, 
    totalPrice, 
    clearCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  const { builddata } = data || {};

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}/detail`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{builddata?.title || "Shopping Cart"}</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                    <button 
                      
                      onClick={clearCart}
                      
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  {items.map((item: any) => (
                    <div key={item.product.id} className="py-6 border-b last:border-0 flex flex-col sm:flex-row gap-4">
                      <div 
                        className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden cursor-pointer"
                        onClick={() => handleProductClick(item.product.id)}
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                          <h3 
                            className="font-medium cursor-pointer hover:text-primary"
                            onClick={() => handleProductClick(item.product.id)}
                          >
                            {item.product.name}
                          </h3>
                          <div className="text-gray-900 font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1 mb-4 line-clamp-2">
                          {item.product.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                             
                              className="min-w-0 px-2"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                            
                              className="min-w-0 px-2"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.inventory}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <button
                          
                            onClick={() => removeFromCart(item.product.id)}
                          
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div>
                <div>
                  <h1>{builddata?.orderSummaryTitle || "Order Summary"}</h1>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{builddata?.subtotalText || `Subtotal (${totalItems} items)`}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{builddata?.shippingText || "Shipping"}</span>
                    <span>{builddata?.shippingPrice || "Free"}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-4 border-t">
                    <span>{builddata?.totalText || "Total"}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <button 
                    
                    onClick={() => router.push('/checkout')}
                  >
                    {builddata?.checkoutButtonText || "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold">
              {builddata?.emptyCartTitle || "Your cart is empty"}
            </h2>
            <p className="mt-2 text-gray-500">
              {builddata?.emptyCartMessage || "Add items to your cart to see them here."}
            </p>
            <button 
              
              className="mt-6" 
              onClick={() => router.push(builddata?.continueShoppingLink || '/products')}
            >
              {builddata?.continueShoppingText || "Continue Shopping"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage; 