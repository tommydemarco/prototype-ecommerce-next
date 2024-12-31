import React from "react";
import styles from "./SkeletonLoader.module.css";

type SkeletonLoaderProps = {
  width?: number;
  height: number;
  className?: string;
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  className,
}) => {
  const style =
    width !== undefined
      ? { paddingBottom: `${(height / width) * 100}%`, width: "100%" }
      : { height: `${height}px`, width: "100%" };

  return (
    <div className={`${styles.skeletonLoader} ${className || ""}`}>
      <div className={styles.aspectWrapper} style={style}>
        <div className={styles.content}></div>
      </div>
    </div>
  );
};
