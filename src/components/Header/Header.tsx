import React, { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "../Button/Button";
import Link from "next/link";
import { useCart } from "@/store/CartContext";

export const Header: React.FC = () => {
  const { cartProducts, setIsCartOpen } = useCart();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Search value:", searchValue);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          Next
        </Link>
        <a href="#link1" className={styles.link}>
          Link 1
        </a>
        <a href="#link2" className={styles.link}>
          Link 2
        </a>
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
