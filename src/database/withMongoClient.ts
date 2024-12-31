import { MongoClient } from "mongodb";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export async function withMongoClient<T>(
  handler: (client: MongoClient) => Promise<T>
): Promise<T> {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    return await handler(client);
  } finally {
    await client.close();
  }
}
