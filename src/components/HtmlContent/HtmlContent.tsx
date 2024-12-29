import React from "react";
import styles from "./HtmlContent.module.css";

interface HtmlContentProps {
  content: string;
  className?: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  className,
}) => {
  if (content) {
    const classNames = [styles.container, className].filter(Boolean).join(" ");

    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={classNames}
      />
    );
  } else return null;
};
