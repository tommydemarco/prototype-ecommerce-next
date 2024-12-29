import React, { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "../Button/Button";
import NextLink from "next/link";
import { useCart } from "@/store/CartContext";
import { Link } from "../Link/Link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const router = useRouter();
  const { cartProducts, setIsCartOpen } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const itemsInCart = cartProducts.reduce(
    (prev, next) => prev + next.quantity,
    0
  );

  const handleSearch = () => {
    router.push({
      pathname: `/search`,
      query: { q: searchValue },
    });
    setSearchValue("");
  };

  return (
    <>
      <header className={styles.header}>
        <Button
          primary={false}
          ariaLabel="Toggle menu"
          className={styles.burgerMenu}
          onClick={() => setIsSidebarOpen(true)}
        >
          <span>&#9472;</span>
          <span>&#9472;</span>
          <span>&#9472;</span>
        </Button>
        <nav className={styles.leftSection}>
          <NextLink href="/" className={styles.logo}>
            Next
          </NextLink>
          <div className={styles.navLinks}>
            <Link href="/search">All products</Link>
            <Link href="/search?max-price=20">Cheapest</Link>
          </div>
        </nav>
        <div className={styles.middleSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              primary={false}
              className={styles.searchButton}
              onClick={handleSearch}
            >
              Go
            </Button>
          </div>
        </div>
        <div className={styles.rightSection}>
          <Button
            primary
            badge={itemsInCart}
            onClick={() => setIsCartOpen(true)}
            className={styles.button}
          >
            Cart
          </Button>
        </div>
      </header>
      <aside
        aria-hidden={!isSidebarOpen}
        className={`${styles.headerSidebar} ${isSidebarOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.headerSidebarElement}>
          <Button
            primary={false}
            ariaLabel="Close menu"
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </Button>
          <div className={styles.title}>Menu</div>
        </div>
        <div className={styles.content}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              primary={false}
              className={styles.searchButton}
              onClick={() => {
                setIsSidebarOpen(false);
                handleSearch();
              }}
            >
              Go
            </Button>
          </div>
          <div className={styles.sidebarNav}>
            <Button
              primary={false}
              className={styles.sidebarButton}
              onClick={() => {
                setIsSidebarOpen(false);
                router.push({
                  pathname: `/search`,
                });
              }}
            >
              All products
            </Button>
            <Button
              primary={false}
              className={styles.sidebarButton}
              onClick={() => {
                setIsSidebarOpen(false);
                router.push({
                  pathname: "/search",
                  query: { "max-price": 20 },
                });
              }}
            >
              Cheapest
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
