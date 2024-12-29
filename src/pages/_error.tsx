import { HtmlContent } from "@/components/HtmlContent/HtmlContent";
import { StaticPageData } from "@/types";
import { appName } from "@/utils/textConstants";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface PageProps {
  pageData: StaticPageData;
}

const ErrorPage: NextPage<PageProps> = () => {
  return (
    <>
      <Head>
        <title>Error | {appName}</title>
        <meta
          name="description"
          content={
            "An unexpected error occurred. We're working to resolve it. Please try again later."
          }
        />
      </Head>
      <HtmlContent>
        <h1>An error occurred</h1>
        <p>Error: Unable to process your request. Please return later.</p>
      </HtmlContent>
    </>
  );
};

export default ErrorPage;
