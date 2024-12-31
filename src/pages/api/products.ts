import { fetchProducts } from "@/utils/fetchProducts";
import { withMongoClient } from "@/utils/withMongoClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { category, maxPrice, sortByPrice, searchText } = req.query;

    const products = await withMongoClient(async (client) => {
      return await fetchProducts(client, {
        category: (category || undefined) as string | undefined,
        maxPrice: !!maxPrice ? parseFloat(maxPrice as string) : undefined,
        sortByPrice:
          sortByPrice === ""
            ? undefined
            : sortByPrice === "price-asc"
              ? "asc"
              : "desc",
        searchText: (searchText as string) || undefined,
      });
    });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
