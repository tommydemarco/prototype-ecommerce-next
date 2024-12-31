import { useCart } from "@/store/CartContext";
import React from "react";
import styles from "./BackdropLayer.module.css";

export const BackdropLayer: React.FC = () => {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className={`${styles.backdropLayer} ${isCartOpen ? styles.open : styles.closed}`}
    ></div>
  );
};
