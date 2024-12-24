import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

interface PageProps {
  products: any[];
}

const HomePage: NextPage<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Next ecommerce prototype</div>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      products: [],
    },
  };
};
