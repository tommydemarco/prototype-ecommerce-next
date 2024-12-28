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

const PrivacyPolicyPage: NextPage<PageProps> = ({ pageData }) => {
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

export default PrivacyPolicyPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const pageData = await withMongoClient(async (client) => {
    return await fetchStaticPageData(client, "privacy-policy");
  });

  if (!pageData) return { notFound: true };

  return {
    props: {
      pageData: pageData,
    },
  };
};
