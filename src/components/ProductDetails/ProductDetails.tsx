import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductDetails.module.css";
import { Product } from "@/types";
import { Button } from "../Button/Button";
import { HtmlContent } from "../HtmlContent/HtmlContent";
import { useCart } from "@/store/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addProductToCart, setIsCartOpen } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    "/images/garden-trowel-1.webp",
    "/images/garden-trowel-2.webp",
    "/images/garden-trowel-3.webp",
  ]; // product.images

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.imageContainer}>
          <Image
            src={productImages[currentImageIndex]}
            alt={product.name}
            width={550}
            height={550}
            className={styles.mainImage}
          />
          <div className={styles.controls}>
            <button
              aria-label="previous image"
              className={styles.arrow}
              onClick={handlePrevImage}
            >
              &lt;
            </button>
            <button
              aria-label="next image"
              className={styles.arrow}
              onClick={handleNextImage}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className={styles.thumbnails}>
          {productImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.thumbnailContainer} ${
                index === currentImageIndex ? styles.activeThumbnail : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={styles.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightColumn}>
        <h1 className={styles.title}>{product.name}</h1>
        <HtmlContent
          className={styles.description}
          content={product.description}
        />
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {product.stock_quantity > 0 ? (
          <Button
            primary
            onClick={() => {
              addProductToCart(product);
              setIsCartOpen(true);
            }}
            className={styles.addToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <p>This item is currently out of stock</p>
        )}
      </div>
    </div>
  );
};
