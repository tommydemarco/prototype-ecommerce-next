import React from "react";
import { useCart } from "@/store/CartContext";
import { Button } from "../Button/Button";
import styles from "./CartDrawer.module.css";

export const CartDrawer: React.FC = () => {
  const { cartProducts, isCartOpen, setIsCartOpen } = useCart();

  return (
    <div
      className={`${styles["cart-drawer"]} ${isCartOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        <div className={styles.title}>Your cart</div>
        <Button
          primary={false}
          alt-desc="close"
          className={styles.closeButton}
          onClick={() => setIsCartOpen(false)}
        >
          &times;
        </Button>
      </div>
      <div className={styles.content}>Contents</div>
    </div>
  );
};
