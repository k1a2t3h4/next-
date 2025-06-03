'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inventory: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  proceedToCheckout: (products: Product[] | Product, quantity?: number) => void;
  checkoutItems: CartItem[];
  clearCheckout: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: any) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.inventory) {
          return prevItems;
        }
        
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

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => {
      const product = prevItems.find(item => item.product.id === productId)?.product;
      if (product && quantity > product.inventory) {
        return prevItems;
      }

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

  const proceedToCheckout = (products: Product[] | Product, quantity = 1) => {
    const productArray = Array.isArray(products) ? products : [products];
    const checkoutItems = productArray.map(product => ({
      product,
      quantity: Array.isArray(products) ? 1 : quantity
    }));
    setCheckoutItems(checkoutItems);
  };

  const clearCheckout = () => {
    setCheckoutItems([]);
  };

  const getCartItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = getCartItemCount();
  const totalPrice = getCartTotal();

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        proceedToCheckout,
        checkoutItems,
        clearCheckout,
        getCartItemCount,
        getCartTotal,
        isInCart,
        getCartItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 