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

  const itemsInCart = cartProducts.reduce(
    (prev, next) => prev + next.quantity,
    0
  );

  const handleSearch = () => {
    const formattedSearchValue = encodeURIComponent(
      searchValue.trim().toLowerCase()
    );
    router.push(`${formattedSearchValue}`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.leftSection}>
        <NextLink href="/" className={styles.logo}>
          Next
        </NextLink>
        <Link href="/search">All products</Link>
        <Link href="/search?price-limit=20">Cheapest</Link>
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
  );
};
