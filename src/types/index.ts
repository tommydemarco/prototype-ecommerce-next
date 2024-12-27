export interface Product {
  price: number;
  name: string;
  product_id: string;
  slug: string;
  images: string[];
  description: string;
  stock_quantity: number;
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
  slug: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface PageMetadata {
  title: string;
  description?: string;
}

export const product = {
  _id: { $oid: "674f6a9619d9f1da02630b4e" },
  product_id: "P1",
  slug: "garden-trowel",
  name: "Garden Trowel",
  description:
    "<h2>Garden Trowel: Your Essential Planting Tool</h2><p>The Garden Trowel is an indispensable tool for every gardener. Crafted from durable stainless steel, it is perfect for planting seeds, bulbs, and small plants. With its ergonomic handle, this trowel ensures comfort even during long gardening sessions.</p><p>Whether you're working in a vegetable garden, a flower bed, or indoor planters, the Garden Trowel provides unmatched precision. Its sharp edge easily cuts through soil, making it ideal for digging small holes or transferring soil into pots. Additionally, the rust-resistant material guarantees a long-lasting tool that maintains its sleek appearance.</p><p>For beginners and experienced gardeners alike, this trowel offers exceptional value. Pair it with other planting tools for a complete gardening experience.</p><h3>Why Choose the Garden Trowel?</h3><ul><li>Durable and rust-resistant materials</li><li>Ergonomic handle for maximum comfort</li><li>Perfect for precise planting and soil transfer</li></ul><p>Upgrade your gardening toolkit today with this reliable and versatile Garden Trowel.</p>",
  price: 12.99,
  category_id: "1",
  stock_quantity: 100,
  images: [
    "/images/garden-trowel-1.webp",
    "/images/garden-trowel-2.webp",
    "/images/garden-trowel-3.webp",
  ],
};

export const categories = [
  {
    category_id: "1",
    name: "Planting Tools",
    description:
      "Tools designed for planting seeds, bulbs, and saplings with precision and ease.",
    slug: "planting-tools",
  },
  {
    category_id: "2",
    name: "Pruning and Cutting Tools",
    description:
      "Tools for trimming, cutting, and maintaining plants and trees, including shears and loppers.",
    slug: "pruning-and-cutting-tools",
  },
  {
    category_id: "3",
    name: "Weeding and Soil Preparation",
    description:
      "Essential tools for removing weeds and preparing soil for planting.",
    slug: "weeding-and-soil-preparation",
  },
];
