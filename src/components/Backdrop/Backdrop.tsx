import { useCart } from "@/store/CartContext";
import React from "react";
import styles from "./Backdrop.module.css";

export const Backdrop: React.FC = () => {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <div
      onClick={() => setIsCartOpen(false)}
      className={`${styles["backdrop"]} ${isCartOpen ? styles.open : styles.closed}`}
    ></div>
  );
};
