import { FilterItems } from "@/components/FilterItems/FilterItems";
import { SearchGrid } from "@/components/SearchGrid/SearchGrid";
import { Category, Product, product, categories as cats } from "@/types";
import { sortingParams } from "@/utils/sortingParams";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const results = [product, product, product];

const SearchPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(cats);
  }, []);

  useEffect(() => {
    setSearchResults(results);
  }, [router.query.search]);

  return (
    <SearchGrid
      searchResults={searchResults}
      categories={
        <FilterItems
          filterTitle="Categories"
          filterItems={categories.map((category) => ({
            name: category.name,
            routerPath: category.slug,
            asSearchParam: false,
          }))}
        />
      }
      sortParams={
        <FilterItems filterTitle="Sort by" filterItems={sortingParams} />
      }
    />
  );
};

export default SearchPage;
