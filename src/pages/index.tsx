import { FeaturedSlider } from "@/components/FeaturedSlider/FeaturedSlider";
import { HightlightedHero } from "@/components/HightlightedHero/HightlightedHero";
import { fetchFeaturedProducts } from "@/utils/fetchFeaturedProducts";
import { withMongoClient } from "@/utils/withMongoClient";
import { Product } from "@/types";
import { appDescription, appName } from "@/utils/textConstants";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

interface PageProps {
  highlightedProducts: Product[];
  featuredProducts: Product[];
}

const HomePage: NextPage<PageProps> = ({
  highlightedProducts,
  featuredProducts,
}) => {
  return (
    <>
      <Head>
        <title>{appName}</title>
        <meta name="description" content={appDescription} />
      </Head>
      <div>
        <HightlightedHero
          mainHighlighted={highlightedProducts[0]}
          secondaryHighlighted={[
            highlightedProducts[1],
            highlightedProducts[2],
          ]}
        />
        <FeaturedSlider products={featuredProducts} />
      </div>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const featuredProductsData = await withMongoClient(async (client) => {
    return await fetchFeaturedProducts(client);
  });

  const highlightedProducts = featuredProductsData.slice(0, 3);
  const featuredProducts = featuredProductsData.slice(3);

  return {
    props: {
      highlightedProducts: highlightedProducts,
      featuredProducts: featuredProducts,
    },
  };
};
