import React from "react";
import styles from "./Skeleton.module.css";

type SkeletonProps = {
  width?: number; // Aspect ratio width (optional)
  height: number; // Aspect ratio height or explicit height in pixels
  className?: string; // Optional additional class names
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
}) => {
  const style =
    width !== undefined
      ? { paddingBottom: `${(height / width) * 100}%`, width: "100%" }
      : { height: `${height}px`, width: "100%" };

  return (
    <div className={`${styles.skeleton} ${className || ""}`}>
      <div className={styles.aspectWrapper} style={style}>
        <div className={styles.content}></div>
      </div>
    </div>
  );
};
