import { Product } from "@/types";
import { MongoClient } from "mongodb";
import { dbName, productsTableName } from ".";

export async function fetchSuggestedProducts(
  client: MongoClient,
  slug: string
): Promise<Product[]> {
  const db = client.db(dbName);
  const collection = db.collection<Product>(productsTableName);

  const relatedProducts = await collection
    .find({ slug: { $ne: slug } })
    .limit(10)
    .toArray();

  return relatedProducts;
}
