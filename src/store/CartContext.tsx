import { Product } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextValue {
  setIsCartOpen: (isCartOpen: boolean) => void;
  isCartOpen: boolean;
  cartProducts: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (slug: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const addProductToCart = (product: Product) => {
    setCartProducts((prev) => [...prev, product]);
  };

  const removeProductFromCart = (slug: string) => {
    setCartProducts((prev) => prev.filter((product) => product.slug !== slug));
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setIsCartOpen,
        isCartOpen,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
