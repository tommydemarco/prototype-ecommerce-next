import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { RelatedSlider } from "@/components/RelatedSlider/RelatedSlider";
import { fetchProduct } from "@/utils/fetchSingleProduct";
import { fetchSuggestedProducts } from "@/utils/fetchSuggestedProducts";
import { withMongoClient } from "@/utils/withMongoClient";
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
  const { slug } = context.params!;

  const { product, suggestedProducts } = await withMongoClient(
    async (client) => {
      const product = await fetchProduct(client, slug as string);
      const suggestedProducts = await fetchSuggestedProducts(
        client,
        slug as string
      );
      console.log("SSR: Fetching product data");
      return { product, suggestedProducts };
    }
  );

  if (!product) return { notFound: true };

  return {
    props: {
      product: product,
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
      <div>
        <ProductDetails product={product} />
        <RelatedSlider
          title="Suggested products"
          products={suggestedProducts}
        />
      </div>
    </>
  );
};

export default ProductPage;
