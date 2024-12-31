import { MongoClient } from "mongodb";
import { Category, Product } from "@/types";
import { categoriesTableName, dbName, productsTableName } from ".";

export interface ProductQueryParams {
  category?: string;
  maxPrice?: number;
  sortByPrice?: "asc" | "desc";
  searchText?: string | undefined;
}

export async function fetchProducts(
  client: MongoClient,
  queryParams: ProductQueryParams
): Promise<Product[]> {
  const db = client.db(dbName);
  const productCollection = db.collection<Product & { _id: Object }>(
    productsTableName
  );

  const query: Record<string, any> = {};

  if (queryParams.category) {
    const categoriesCollection = db.collection<Category & { _id: Object }>(
      categoriesTableName
    );
    const selectedCategory = await categoriesCollection.findOne({
      slug: queryParams.category,
    });
    if (selectedCategory) {
      query.category_id = selectedCategory.category_id;
    } else {
      return [];
    }
  }

  if (queryParams.maxPrice !== undefined) {
    query.price = { $lt: queryParams.maxPrice };
  }

  if (queryParams.searchText) {
    query.name = { $regex: queryParams.searchText, $options: "i" };
  }

  const sort: Record<string, 1 | -1> = {};
  if (queryParams.sortByPrice) {
    sort.price = queryParams.sortByPrice === "asc" ? 1 : -1;
  }

  const products = await productCollection.find(query).sort(sort).toArray();

  return products.map(({ _id, ...product }) => product);
}
