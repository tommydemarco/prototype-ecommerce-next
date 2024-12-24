import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MainLayout } from "@/layouts/MainLayout";
import { CartProvider } from "@/store/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </CartProvider>
  );
}
