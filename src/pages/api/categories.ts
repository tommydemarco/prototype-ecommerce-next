import { NextApiRequest, NextApiResponse } from "next";
import { fetchProductCategories } from "@/database/fetchProductCategories";
import { withMongoClient } from "@/database/withMongoClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const categories = await withMongoClient(async (client) => {
      return await fetchProductCategories(client);
    });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
