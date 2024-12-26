import { ProductDetails } from "@/components/ProductDetails/ProductDetails";
import { RelatedSlider } from "@/components/RelatedSlider/RelatedSlider";
import { product, Product } from "@/types";
import { GetServerSideProps, NextPage } from "next";

interface PageProps {
  product: Product;
  relatedProducts: Product[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  return {
    props: {
      product: product as unknown as Product,
      relatedProducts: [
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

const ProductPage: NextPage<PageProps> = ({ product, relatedProducts }) => {
  return (
    <>
      <ProductDetails product={product} />
      <RelatedSlider title="Related products" products={relatedProducts} />
    </>
  );
};

export default ProductPage;
