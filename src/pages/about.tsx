import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { PageMetadata } from "@/types";
import { appName } from "@/utils/textConstants";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";

interface PageProps {
  pageMetadata: PageMetadata;
  pageContent: string;
}

const AboutPage: NextPage<PageProps> = ({ pageMetadata, pageContent }) => {
  return (
    <>
      <Head>
        <title>
          {pageMetadata.title} | {appName}
        </title>
        <meta name="description" content={pageMetadata.description} />
      </Head>
      <HtmlContent content={pageContent} />
    </>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      pageMetadata: { title: "About" },
      pageContent: "<h2>About</h2>",
    },
  };
};
