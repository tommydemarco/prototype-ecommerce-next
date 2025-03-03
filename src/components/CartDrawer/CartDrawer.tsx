import React from "react";
import { useCart } from "@/store/CartContext";
import { ButtonElement } from "../ButtonElement/ButtonElement";
import styles from "./CartDrawer.module.css";
import { CartProduct } from "../CartProduct/CartProduct";

export const CartDrawer: React.FC = () => {
  const {
    cartProducts,
    isCartOpen,
    setIsCartOpen,
    decrementProductFromCart,
    removeProductFromCart,
  } = useCart();
  const cartTotal = cartProducts.reduce(
    (prev, next) => prev + next.quantity * next.price,
    0
  );

  return (
    <div
      className={`${styles.cartDrawer} ${isCartOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        <div className={styles.title}>Your cart</div>
        <ButtonElement
          primary={false}
          alt-desc="close"
          className={styles.closeButton}
          onClick={() => setIsCartOpen(false)}
        >
          &times;
        </ButtonElement>
      </div>
      <div className={styles.content}>
        {cartProducts.length ? (
          <>
            <div className={styles.productsContainer}>
              {cartProducts.map((cartProduct) => {
                return (
                  <CartProduct
                    product={cartProduct}
                    decrementProductFromCart={decrementProductFromCart}
                    removeProductFromCart={removeProductFromCart}
                    key={cartProduct.product_id}
                  />
                );
              })}
            </div>
            <div className={styles.cartInfo}>
              <div className={styles.infoItem}>
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.infoItem}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={styles.infoItem}>
                <span>Total</span>
                <span>${cartTotal?.toFixed(2)}</span>
              </div>
              <ButtonElement primary={true} className={styles.checkoutButton}>
                Proceed to checkout
              </ButtonElement>
            </div>
          </>
        ) : (
          <div className={styles.productsContainer}>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};
