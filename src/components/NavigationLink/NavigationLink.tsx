import NextLink, { LinkProps as NextLinkProps } from "next/link";
import styles from "./NavigationLink.module.css";

interface NavigationLinkProps extends NextLinkProps {
  children: React.ReactNode;
}

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  return (
    <NextLink {...props} className={styles.navigationLink}>
      {props.children}
    </NextLink>
  );
};
