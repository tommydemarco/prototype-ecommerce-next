import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductDetails.module.css";
import { Product } from "@/types";
import { Button } from "../Button/Button";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.imageContainer}>
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            layout="responsive"
            width={400}
            height={400}
            className={styles.mainImage}
          />
          <div className={styles.controls}>
            <button className={styles.arrow} onClick={handlePrevImage}>
              &lt;
            </button>
            <button className={styles.arrow} onClick={handleNextImage}>
              &gt;
            </button>
          </div>
        </div>
        <div className={styles.thumbnails}>
          {product.images.map((image, index) => (
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
                layout="responsive"
                width={1}
                height={1}
                className={styles.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightColumn}>
        <h1 className={styles.title}>{product.name}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={styles.description}
        />
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {product.stock_quantity > 0 ? (
          <Button primary onClick={() => {}}>
            Add to Cart
          </Button>
        ) : (
          <p>This item is currently out of stock</p>
        )}
      </div>
    </div>
  );
};
