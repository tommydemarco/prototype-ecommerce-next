import { Product } from "@/types";
import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  layoutType: "square" | "rectangular";
  className?: string;
  priorityImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  product,
  layoutType,
  priorityImage,
}) => {
  return (
    <Link
      href={`/products/${product.product_slug}`}
      title={product.name}
      className={`${styles.container} ${styles[layoutType]} ${className ? className : ``}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className={styles.mainImage}
          loading={!!priorityImage ? "eager" : "lazy"}
          priority={!!priorityImage}
          quality={80}
          sizes="800px"
          decoding={!!priorityImage ? "sync" : "async"}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>${product.price?.toFixed(2)}</div>
      </div>
    </Link>
  );
};
