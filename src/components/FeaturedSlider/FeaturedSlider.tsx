import React, { useEffect, useRef } from "react";
import styles from "./FeaturedSlider.module.css";
import { Product } from "@/types";
import { ProductCard } from "../ProductCard/ProductCard";

interface FeaturedSliderProps {
  products: Product[];
}

export const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Based on the approach from https://www.geeksforgeeks.org/how-to-detect-touch-screen-device-using-javascript/
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    let scrollDirection = 1;
    const speed = 2;
    const intervalDuration = 50;

    const animateScroll = () => {
      if (!isHoveredRef.current) {
        if (
          slider.scrollLeft + slider.offsetWidth >=
            slider.scrollWidth - speed &&
          scrollDirection === 1
        ) {
          scrollDirection = -1;
        } else if (slider.scrollLeft <= speed && scrollDirection === -1) {
          scrollDirection = 1;
        }

        slider.scrollLeft += scrollDirection * speed;
      }
    };

    intervalRef.current = window.setInterval(animateScroll, intervalDuration);

    const stopAnimation = () => (isHoveredRef.current = true);
    const startAnimation = () => (isHoveredRef.current = false);

    slider.addEventListener("mouseenter", stopAnimation);
    slider.addEventListener("mouseleave", startAnimation);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      slider?.removeEventListener("mouseenter", stopAnimation);
      slider?.removeEventListener("mouseleave", startAnimation);
    };
  }, []);

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
