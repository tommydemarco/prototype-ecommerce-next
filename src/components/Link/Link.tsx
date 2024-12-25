import NextLink, { LinkProps as NextLinkProps } from "next/link";
import styles from "./Link.module.css";

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = (props) => {
  return (
    <NextLink {...props} className={styles.link}>
      {props.children}
    </NextLink>
  );
};
