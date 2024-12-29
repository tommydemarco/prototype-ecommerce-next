import { FilterItems } from "@/components/FilterItems/FilterItems";
import { SearchGrid } from "@/components/SearchGrid/SearchGrid";
import { Category, Product } from "@/types";
import { sortingParams } from "@/utils/sortingParams";
import { appName } from "@/utils/textConstants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);
  const [isSearchResultsLoading, setIsSearchResultsLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        router.push("/_error");
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsSearchResultsLoading(true);
        const queryParams = {
          category: (router.query.category || "") as string,
          maxPrice: (router.query?.["max-price"] || "") as string,
          sortByPrice: (router.query?.["sort"] || "") as string,
          searchText: (router.query?.["q"] || "") as string,
        };
        const query = new URLSearchParams(queryParams);
        const response = await fetch(`/api/products?${query}`);
        throw new Error("Failed to fetch products");
        const data: Product[] = await response.json();
        setSearchResults(data);
      } catch (err) {
        router.push("/_error");
      } finally {
        setIsSearchResultsLoading(false);
      }
    };

    fetchProducts();
  }, [router.query, router.isReady]);

  return (
    <>
      <Head>
        <title>Search Products | {appName}</title>
        <meta
          name="description"
          content={`Search your fevourite products from ${appName}`}
        />
      </Head>
      <SearchGrid
        isLoading={isSearchResultsLoading}
        searchResults={searchResults}
        categories={
          <FilterItems
            isLoading={isCategoriesLoading}
            filterTitle="Categories"
            filterItems={[
              { name: "All", path: "" },
              ...categories.map((category) => ({
                name: category.name,
                path: category.slug,
              })),
            ]}
          />
        }
        sortParams={
          <FilterItems filterTitle="Sort by" filterItems={sortingParams} />
        }
      />
    </>
  );
};

export default SearchPage;
