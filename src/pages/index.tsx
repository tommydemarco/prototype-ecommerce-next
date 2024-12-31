import { FeaturedSlider } from "@/components/FeaturedSlider/FeaturedSlider";
import { HightlightedHero } from "@/components/HightlightedHero/HightlightedHero";
import { fetchFeaturedProducts } from "@/database/fetchFeaturedProducts";
import { withMongoClient } from "@/database/withMongoClient";
import { Product } from "@/types";
import { appName } from "@/utils/textConstants";
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
        <meta
          name="description"
          content="A prototype e-commerce built for performance benchmarking"
        />
      </Head>
      <HightlightedHero
        mainHighlighted={highlightedProducts[0]}
        secondaryHighlighted={[highlightedProducts[1], highlightedProducts[2]]}
      />
      <FeaturedSlider products={featuredProducts} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const featuredProducts = await withMongoClient(async (client) => {
    return await fetchFeaturedProducts(client);
  });

  const featuredHighlighted = featuredProducts.slice(0, 3);
  const featured = featuredProducts.slice(3);

  return {
    props: {
      highlightedProducts: featuredHighlighted,
      featuredProducts: featured,
    },
  };
};
