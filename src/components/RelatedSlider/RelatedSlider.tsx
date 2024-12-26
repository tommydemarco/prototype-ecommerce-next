import React from "react";
import styles from "./RelatedSlider.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";

interface RelatedSliderProps {
  title: string;
  products: Product[];
}

export const RelatedSlider: React.FC<RelatedSliderProps> = ({
  title,
  products,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.slider}>
        {products.map((product) => {
          return (
            <ProductCard
              layoutType="square"
              product={product}
              key={product.name}
            />
          );
        })}
      </div>
    </div>
  );
};
