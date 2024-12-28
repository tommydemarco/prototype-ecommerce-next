import { FilterItems } from "@/components/FilterItems/FilterItems";
import { SearchGrid } from "@/components/SearchGrid/SearchGrid";
import { Category, Product, product, categories as cats } from "@/types";
import { sortingParams } from "@/utils/sortingParams";
import { appName } from "@/utils/textConstants";
import Head from "next/head";
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
    if (router.query.category === undefined && router.isReady) {
      console.log("ROUTER QUERY INDEX: ", router.query);
      setSearchResults(results);
    }
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
        searchResults={searchResults}
        categories={
          <FilterItems
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
