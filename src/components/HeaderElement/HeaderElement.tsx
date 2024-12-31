import React, { useState } from "react";
import styles from "./HeaderElement.module.css";
import { ButtonElement } from "../ButtonElement/ButtonElement";
import NextLink from "next/link";
import { useCart } from "@/store/CartContext";
import { NavigationLink } from "../NavigationLink/NavigationLink";
import { useRouter } from "next/router";

export const HeaderElement: React.FC = () => {
  const router = useRouter();
  const { cartProducts, setIsCartOpen } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const itemsInCart = cartProducts.reduce(
    (prev, next) => prev + next.quantity,
    0
  );

  const handleSearch = () => {
    const cleanedSearchValue = searchValue.trim();
    if (cleanedSearchValue !== "") {
      router.push({
        pathname: `/search`,
        query: { q: searchValue },
      });
    } else {
      router.push("/search");
    }
    setSearchValue("");
  };

  return (
    <div>
      <header className={styles.headerElement}>
        <ButtonElement
          primary={false}
          ariaLabel="Toggle menu"
          className={styles.burgerMenu}
          onClick={() => setIsSidebarOpen(true)}
        >
          <span>&#9472;</span>
          <span>&#9472;</span>
          <span>&#9472;</span>
        </ButtonElement>
        <nav className={styles.leftSection}>
          <NextLink href="/" className={styles.logo}>
            Next
          </NextLink>
          <div className={styles.navLinks}>
            <NavigationLink href="/search">All products</NavigationLink>
            <NavigationLink href="/search?max-price=20">
              Cheapest
            </NavigationLink>
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
            <ButtonElement
              primary={false}
              className={styles.searchButton}
              onClick={handleSearch}
            >
              Go
            </ButtonElement>
          </div>
        </div>
        <div className={styles.rightSection}>
          <ButtonElement
            primary
            badge={itemsInCart}
            onClick={() => setIsCartOpen(true)}
          >
            Cart
          </ButtonElement>
        </div>
      </header>
      <aside
        className={`${styles.headerSidebar} ${isSidebarOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.headerSidebarElement}>
          <ButtonElement
            primary={false}
            ariaLabel="Close menu"
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </ButtonElement>
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
            <ButtonElement
              primary={false}
              className={styles.searchButton}
              onClick={() => {
                setIsSidebarOpen(false);
                handleSearch();
              }}
            >
              Go
            </ButtonElement>
          </div>
          <div className={styles.sidebarNav}>
            <ButtonElement
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
            </ButtonElement>
            <ButtonElement
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
            </ButtonElement>
          </div>
        </div>
      </aside>
    </div>
  );
};
