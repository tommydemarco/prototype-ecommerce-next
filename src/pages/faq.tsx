import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { PageMetadata } from "@/types";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface PageProps {
  pageMetadata: PageMetadata;
  pageContent: string;
}

const FAQPage: NextPage<PageProps> = ({ pageContent }) => {
  return <HtmlContent content={pageContent} />;
};

export default FAQPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      pageMetadata: { title: "FAQs" },
      pageContent: "<h2>FAQs</h2>",
    },
  };
};
