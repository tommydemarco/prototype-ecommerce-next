import React, { useEffect, useRef } from "react";
import styles from "./FeaturedSlider.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";
import { useRouter } from "next/router";

interface FeaturedSliderProps {
  products: Product[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  //   useEffect(() => {
  //     const slider = sliderRef.current;
  //     if (!slider) return;

  //     let scrollDirection = 1;
  //     const speed = 8;

  //     const animateScroll = () => {
  //       if (!isHoveredRef.current) {
  //         if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
  //           scrollDirection = -1;
  //         } else if (slider.scrollLeft <= 0) {
  //           scrollDirection = 1;
  //         }

  //         slider.scrollLeft += scrollDirection * speed;
  //       }
  //       animationRef.current = requestAnimationFrame(animateScroll);
  //     };

  //     animationRef.current = requestAnimationFrame(animateScroll);

  //     const stopAnimation = () => (isHoveredRef.current = true);

  //     const startAnimation = () => (isHoveredRef.current = false);

  //     slider.addEventListener("mouseenter", stopAnimation);
  //     slider.addEventListener("mouseleave", startAnimation);

  //     return () => {
  //       if (animationRef.current) {
  //         cancelAnimationFrame(animationRef.current);
  //       }
  //       slider.removeEventListener("mouseenter", stopAnimation);
  //       slider.removeEventListener("mouseleave", startAnimation);
  //     };
  //   }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slider} ref={sliderRef}>
        {products.map((product) => (
          <ProductCard
            layoutType="rectangular"
            product={product}
            key={product.name}
          />
        ))}
      </div>
    </div>
  );
};
