import { Category } from "@/types";
import { MongoClient } from "mongodb";
import { categoriesTableName, dbName } from ".";

export async function fetchProductCategories(
  client: MongoClient
): Promise<Category[]> {
  const db = client.db(dbName);
  const collection = db.collection<Category & { _id: object }>(
    categoriesTableName
  );

  const productCategories = await collection.find({}).toArray();
  const cleanedCategores = productCategories.map(
    ({ _id, ...category }) => category
  );

  return cleanedCategores;
}
