import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { fetchStaticPageData } from "@/database/fetchStaticPageData";
import { withMongoClient } from "@/database/withMongoClient";
import { StaticPageData } from "@/types";
import { appName } from "@/utils/textConstants";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

interface PageProps {
  pageData: StaticPageData;
}

const TermsAndConditionsPage: NextPage<PageProps> = ({ pageData }) => {
  return (
    <>
      <Head>
        <title>
          {pageData.title} | {appName}
        </title>
        <meta name="description" content={pageData.description} />
      </Head>
      <HtmlContent content={pageData.content} />
    </>
  );
};

export default TermsAndConditionsPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const pageData = await withMongoClient(async (client) => {
    return await fetchStaticPageData(client, "terms-and-conditions");
  });

  if (!pageData) return { notFound: true };

  return {
    props: {
      pageData: pageData,
    },
  };
};
