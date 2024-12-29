import React from "react";
import styles from "./HtmlContent.module.css";

interface HtmlContentProps {
  content?: string;
  children?: React.ReactNode;
  className?: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({
  children,
  content,
  className,
}) => {
  const classNames = [styles.container, className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
      {children}
    </div>
  );
};
