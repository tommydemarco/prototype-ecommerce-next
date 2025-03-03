import React from "react";
import styles from "./CartProduct.module.css";
import { CartProduct as CartProductType } from "@/types";
import Image from "next/image";

interface CartProductProps {
  product: CartProductType;
  decrementProductFromCart: (product: CartProductType) => void;
  removeProductFromCart: (product: CartProductType) => void;
}

export const CartProduct: React.FC<CartProductProps> = ({
  product,
  removeProductFromCart,
  decrementProductFromCart,
}) => {
  const itemPrice = product.quantity * product.price;

  const decrement = (product: CartProductType) => {
    if (product.quantity > 1) decrementProductFromCart(product);
  };

  const productImages = product.images;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={productImages[0]}
          alt={product.name}
          width={80}
          height={80}
          className={styles.image}
          loading="lazy"
          quality={80}
          /**
           * Ensures appropariately size generated image is downloaded consistently
           * across all browser, with the same size as the Nuxt Img countearpart
           */
          sizes="80px"
          decoding="async"
        />
        <button
          name="remove product"
          onClick={() => removeProductFromCart(product)}
          className={styles.remove}
        >
          &times;
        </button>
      </div>
      <div className={styles.info}>{product.name}</div>
      <div className={styles.actions}>
        <div className={styles.totalPrice}>${itemPrice}</div>
        <div className={styles.counter}>
          <button
            disabled={product.quantity === 1}
            className={styles.button}
            onClick={() => decrement(product)}
          >
            -
          </button>
          <span className={styles.value}>{product.quantity}</span>
        </div>
      </div>
    </div>
  );
};
