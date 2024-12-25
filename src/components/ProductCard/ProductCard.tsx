import { Product } from "@/types";
import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  layoutType: "square" | "rectangular";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, layoutType }) => {
  return (
    <div className={`${styles.container} ${layoutType}`}>
      <div className={styles.imageContainer}>
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="responsive"
          width={400}
          height={400}
          className={styles.mainImage}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
