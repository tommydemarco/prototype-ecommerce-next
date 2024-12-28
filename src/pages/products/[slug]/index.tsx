import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { RelatedSlider } from "@/components/RelatedSlider/RelatedSlider";
import { product, Product } from "@/types";
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
  return {
    props: {
      product: product as unknown as Product,
      suggestedProducts: [
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
        product,
      ] as unknown as Product[],
    },
  };
};

const ProductPage: NextPage<PageProps> = ({ product, suggestedProducts }) => {
  return (
    <>
      <Head>
        <title>
          {product.name} | {appName}
        </title>
        <meta name="description" content={product.description} />
      </Head>
      <ProductDetails product={product} />
      <RelatedSlider title="Suggested products" products={suggestedProducts} />
    </>
  );
};

export default ProductPage;
