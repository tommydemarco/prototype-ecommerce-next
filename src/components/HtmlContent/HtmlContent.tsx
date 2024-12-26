import React from "react";
import styles from "./HtmlContent.module.css";

interface HtmlContentProps {
  content: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({ content }) => {
  if (content) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={styles.container}
      />
    );
  } else return null;
};
