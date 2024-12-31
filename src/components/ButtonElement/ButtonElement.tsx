import React from "react";
import styles from "./ButtonElement.module.css";

interface ButtonElementProps {
  onClick?: () => void;
  primary: boolean;
  className?: string;
  children: React.ReactNode;
  badge?: number;
  ariaLabel?: string;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({
  ariaLabel,
  onClick,
  primary,
  className,
  children,
  badge,
}) => {
  const buttonClass = [
    styles.buttonElement,
    primary ? styles.primaryButton : styles.secondaryButton,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button aria-label={ariaLabel} className={buttonClass} onClick={onClick}>
      {children}
      {!!badge && badge > 0 && <span className={styles.badge}>{badge}</span>}
    </button>
  );
};
