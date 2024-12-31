import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { fetchStaticPageData } from "@/utils/fetchStaticPageData";
import { withMongoClient } from "@/utils/withMongoClient";
import { StaticPageData } from "@/types";
import { appName } from "@/utils/textConstants";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

interface PageProps {
  pageData: StaticPageData;
}

const FAQPage: NextPage<PageProps> = ({ pageData }) => {
  return (
    <>
      <Head>
        <title>{`${pageData.title} | ${appName}`}</title>
        <meta name="description" content={pageData.description} />
      </Head>
      <HtmlContent content={pageData.content} />
    </>
  );
};

export default FAQPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const pageData = await withMongoClient(async (client) => {
    return await fetchStaticPageData(client, "frequently-asked-questions");
  });

  if (!pageData) return { notFound: true };

  return {
    props: {
      pageData: pageData,
    },
  };
};
