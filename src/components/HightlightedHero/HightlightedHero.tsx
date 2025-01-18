import React from "react";
import styles from "./HightlightedHero.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";

interface HightlightedHeroProps {
  mainHighlighted: Product;
  secondaryHighlighted: Product[];
}

export const HightlightedHero: React.FC<HightlightedHeroProps> = ({
  mainHighlighted,
  secondaryHighlighted,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <ProductCard
          className={styles.mainHighlighted}
          layoutType="rectangular"
          product={mainHighlighted}
          priorityImage={true}
        />
      </div>
      <div className={styles.rightColumn}>
        {secondaryHighlighted.map((product) => {
          return (
            <ProductCard
              layoutType="rectangular"
              key={product.name}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
};
