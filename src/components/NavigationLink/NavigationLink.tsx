import NextLink, { LinkProps as NextLinkProps } from "next/link";
import styles from "./NavigationLink.module.css";
import { UrlObject } from "url";

interface NavigationLinkProps {
  href: UrlObject | string;
  children: React.ReactNode;
}

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  return (
    <NextLink href={props.href} className={styles.navigationLink}>
      {props.children}
    </NextLink>
  );
};
