import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface PageProps {
  pageContent: string;
}

const CookiePolicyPage: NextPage<PageProps> = ({ pageContent }) => {
  return <HtmlContent content={pageContent} />;
};

export default CookiePolicyPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      pageContent: "<h2>Cookie policy</h2>",
    },
  };
};
