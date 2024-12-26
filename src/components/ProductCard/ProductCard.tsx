import { Product } from "@/types";
import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  layoutType: "square" | "rectangular";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layoutType,
}) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      title={product.name}
      className={`${styles.container} ${styles[layoutType]}`}
    >
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
        <div className={styles.price}>${product.price}</div>
      </div>
    </Link>
  );
};
