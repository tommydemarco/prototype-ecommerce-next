import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { FooterElement } from "@/components/FooterElement/FooterElement";
import { HeaderElement } from "@/components/HeaderElement/HeaderElement";
import { BackdropLayer } from "@/components/BackdropLayer/BackdropLayer";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <HeaderElement />
      <main className={styles.main}>{children}</main>
      <CartDrawer />
      <BackdropLayer />
      <FooterElement />
    </div>
  );
};
