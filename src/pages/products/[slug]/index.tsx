import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { RelatedSlider } from "@/components/RelatedSlider/RelatedSlider";
import { fetchProduct } from "@/database/fetchSingleProduct";
import { fetchSuggestedProducts } from "@/database/fetchSuggestedProducts";
import { withMongoClient } from "@/database/withMongoClient";
import { Product } from "@/types";
import { appName } from "@/utils/textConstants";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface PageProps {
  product: Product;
  suggestedProducts: Product[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  context.res.setHeader("Cache-Control", "no-store");

  const { slug } = context.params!;

  const { productData, suggestedProducts } = await withMongoClient(
    async (client) => {
      const productData = await fetchProduct(client, slug as string);
      const suggestedProducts = await fetchSuggestedProducts(
        client,
        slug as string
      );
      return { productData, suggestedProducts };
    }
  );

  if (!productData) return { notFound: true };

  return {
    props: {
      product: productData,
      suggestedProducts: suggestedProducts,
    },
  };
};

const ProductPage: NextPage<PageProps> = ({ product, suggestedProducts }) => {
  return (
    <>
      <Head>
        <title>{`${product.name} | ${appName}`}</title>
        <meta name="description" content={product.description} />
      </Head>
      <ProductDetails product={product} />
      <RelatedSlider title="Suggested products" products={suggestedProducts} />
    </>
  );
};

export default ProductPage;
