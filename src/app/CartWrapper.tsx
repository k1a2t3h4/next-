'use client';

import React, { createContext, useContext } from 'react';

type CartContextType = {
  [key: string]: any;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const contextCodeFromDB = `
  const [items, setItems] = React.useState([]);
  const [checkoutItems, setCheckoutItems] = React.useState([]);

  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.inventory) return prevItems;

        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => {
      const product = prevItems.find(item => item.product.id === productId)?.product;
      if (product && quantity > product.inventory) return prevItems;

      return prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const proceedToCheckout = (products, quantity = 1) => {
    const productArray = Array.isArray(products) ? products : [products];
    const checkout = productArray.map(product => ({
      product,
      quantity: Array.isArray(products) ? 1 : quantity
    }));
    setCheckoutItems(checkout);
  };

  const clearCheckout = () => {
    setCheckoutItems([]);
  };

  const getCartItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const isInCart = (productId) => {
    return items.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = getCartItemCount();
  const totalPrice = getCartTotal();

  return {
    items,
    checkoutItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    proceedToCheckout,
    clearCheckout,
    getCartItemCount,
    getCartTotal,
    isInCart,
    getCartItemQuantity,
    totalItems,
    totalPrice
  };
`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = (() => {
    const fn = new Function('React', `"use strict"; ${contextCodeFromDB}`);
    return fn(React);
  })();

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
