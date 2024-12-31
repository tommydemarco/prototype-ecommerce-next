import { Product } from "@/types";
import { MongoClient } from "mongodb";
import { dbName, productsTableName } from "../utils/dbConstants";

export async function fetchFeaturedProducts(
  client: MongoClient
): Promise<Product[]> {
  const db = client.db(dbName);
  const collection = db.collection<Product>(productsTableName);

  const featuredProducts = await collection.find().limit(13).toArray();

  return featuredProducts.map(({ _id, ...product }) => product);
}
