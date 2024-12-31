import { StaticPageData } from "@/types";
import { MongoClient } from "mongodb";
import { dbName, staticPagesTableName } from ".";

export async function fetchStaticPageData(
  client: MongoClient,
  slug: string
): Promise<StaticPageData | null> {
  const db = client.db(dbName);
  const collection = db.collection<StaticPageData & { _id: object }>(
    staticPagesTableName
  );

  const staticPageData = await collection.findOne({ slug });
  if (staticPageData) {
    const { _id, ...cleanPageData } = staticPageData;
    return cleanPageData;
  } else return null;
}
