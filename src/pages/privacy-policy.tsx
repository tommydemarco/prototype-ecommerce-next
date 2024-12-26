import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { PageMetadata } from "@/types";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface PageProps {
  pageMetadata: PageMetadata;
  pageContent: string;
}

const PrivacyPolicyPage: NextPage<PageProps> = ({ pageContent }) => {
  return <HtmlContent content={pageContent} />;
};

export default PrivacyPolicyPage;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  return {
    props: {
      pageMetadata: { title: "Privacy Policy" },
      pageContent: "<h2>Privacy policy</h2>",
    },
  };
};
