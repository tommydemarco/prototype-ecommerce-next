import { Product } from "@/types";
import { MongoClient } from "mongodb";
import { dbName, productsTableName } from ".";

export async function fetchProduct(
  client: MongoClient,
  slug: string
): Promise<Product | null> {
  const db = client.db(dbName);
  const collection = db.collection<Product & { _id: Object }>(
    productsTableName
  );

  const product = await collection.findOne({ product_slug: slug });

  if (product) {
    const { _id, ...cleanedProduct } = product;
    return cleanedProduct;
  } else return null;
}
