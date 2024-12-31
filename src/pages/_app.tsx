import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MainLayout } from "@/layouts/MainLayout";
import { CartProvider } from "@/store/CartContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CartProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </CartProvider>
    </>
  );
}
