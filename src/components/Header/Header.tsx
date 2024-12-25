import React, { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "../Button/Button";
import NextLink from "next/link";
import { useCart } from "@/store/CartContext";
import { Link } from "../Link/Link";

export const Header: React.FC = () => {
  const { cartProducts, setIsCartOpen } = useCart();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Search value:", searchValue);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.leftSection}>
        <NextLink href="/" className={styles.logo}>
          Next
        </NextLink>
        <Link href="#link1">Link 1</Link>
        <Link href="#link2">Link 2</Link>
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
          badge={cartProducts.length}
          onClick={() => setIsCartOpen(true)}
          className={styles.button}
        >
          Cart
        </Button>
      </div>
    </header>
  );
};
