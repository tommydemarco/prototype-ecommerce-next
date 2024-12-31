import { CartProduct, Product } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextValue {
  setIsCartOpen: (isCartOpen: boolean) => void;
  isCartOpen: boolean;
  cartProducts: CartProduct[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product: CartProduct) => void;
  decrementProductFromCart: (product: CartProduct) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (existingProduct) => existingProduct.product_id === product.product_id
      );
      if (existingProduct) {
        const filteredProducts = prev.filter(
          (existingProduct) => existingProduct.product_id !== product.product_id
        );
        return [
          { ...existingProduct, quantity: existingProduct.quantity + 1 },
          ...filteredProducts,
        ];
      } else {
        return [{ ...product, quantity: 1 }, ...prev];
      }
    });
  };

  const removeProductFromCart = (cartProduct: CartProduct) => {
    setCartProducts((prev) =>
      prev.filter((product) => product.product_id !== cartProduct.product_id)
    );
  };

  const decrementProductFromCart = (productToDecrement: CartProduct) => {
    setCartProducts((prev) => {
      return prev.map((product) => {
        if (product.product_id === productToDecrement.product_id) {
          return {
            ...product,
            quantity:
              product.quantity > 1 ? product.quantity - 1 : product.quantity,
          };
        } else return product;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setIsCartOpen,
        isCartOpen,
        addProductToCart,
        removeProductFromCart,
        decrementProductFromCart,
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
