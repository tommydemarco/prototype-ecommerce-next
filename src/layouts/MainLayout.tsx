import { CartDrawer } from "@/components/CartDrawer/CartDrawer";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import styles from "./MainLayout.module.css";
import { Backdrop } from "@/components/Backdrop/Backdrop";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <CartDrawer />
      <Backdrop />
      <Footer />
    </div>
  );
};
