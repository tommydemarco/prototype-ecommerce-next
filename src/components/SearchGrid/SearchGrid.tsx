import React from "react";
import styles from "./SearchGrid.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";
import { Skeleton } from "../Skeleton/Skeleton";

interface SearchGridProps {
  searchResults: Product[];
  isLoading: boolean;
  categories: React.ReactNode;
  sortParams: React.ReactNode;
}

export const SearchGrid: React.FC<SearchGridProps> = ({
  searchResults,
  isLoading,
  categories,
  sortParams,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesColumn}>{categories}</div>
      <div className={styles.productsColumn}>
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((number) => (
            <Skeleton key={number} width={1} height={1} />
          ))
        ) : searchResults.length > 0 ? (
          searchResults.map((product) => {
            return (
              <ProductCard
                layoutType="square"
                key={product.product_id}
                product={product}
              />
            );
          })
        ) : (
          <div>Your search did not yeald any results.</div>
        )}
      </div>
      <div className={styles.sortColumn}>{sortParams}</div>
    </div>
  );
};
