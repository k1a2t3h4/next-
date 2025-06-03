import React, { createContext, useContext } from 'react';

const CartContext = createContext({ cartCount: 0, addToCart: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ value, children }) => (
  <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
);
