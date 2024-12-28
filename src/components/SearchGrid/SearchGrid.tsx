import React from "react";
import styles from "./SearchGrid.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";
import { Skeleton } from "../Skeleton/Skeleton";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());
  const querySearchParam = currentParams?.["q"];
  return (
    <div className={styles.container}>
      <div className={styles.categoriesColumn}>{categories}</div>
      <div className={styles.productsColumn}>
        {querySearchParam !== undefined && (
          <div>
            Displaying search results for: <strong>{querySearchParam}</strong>
          </div>
        )}
        <div className={styles.productsContainer}>
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
            <div>
              Your search{" "}
              {querySearchParam !== undefined && (
                <span>
                  for <strong>{querySearchParam}</strong>
                </span>
              )}{" "}
              did not yeald any results.
            </div>
          )}
        </div>
      </div>
      <div className={styles.sortColumn}>{sortParams}</div>
    </div>
  );
};
