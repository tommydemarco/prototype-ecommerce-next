import { GetServerSideProps, NextPage } from "next";

interface PageProps {
  product: any;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  return {
    props: {
      product: null,
    },
  };
};

const ProductPage: NextPage<PageProps> = () => {
  return <div>Product page</div>;
};

export default ProductPage;
