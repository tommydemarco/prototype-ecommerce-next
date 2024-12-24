import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  primary: boolean;
  className?: string;
  children: React.ReactNode;
  badge?: number;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  primary,
  className,
  children,
  badge,
}) => {
  const buttonClass = [
    styles.button,
    primary ? styles.primaryButton : styles.secondaryButton,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
      {!!badge && badge > 0 && <span className={styles.badge}>{badge}</span>}
    </button>
  );
};
