import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { PageMetadata } from "@/types";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface PageProps {
  pageMetadata: PageMetadata;
  pageContent: string;
}

const TermsAndConditionsPage: NextPage<PageProps> = ({ pageContent }) => {
  return <HtmlContent content={pageContent} />;
};

export default TermsAndConditionsPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      pageMetadata: { title: "Terms and conditions" },
      pageContent: "<h2>Terms and conditions</h2>",
    },
  };
};
