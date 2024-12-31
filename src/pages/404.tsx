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
        <title>{`Page not found | ${appName}`}</title>
        <meta name="description" content={"Page not found."} />
      </Head>
      <HtmlContent>
        <h1>404</h1>
        <p>Page not found</p>
      </HtmlContent>
    </>
  );
};

export default ErrorPage;
