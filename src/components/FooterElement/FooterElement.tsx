import { NavigationLink } from "../NavigationLink/NavigationLink";
import { ButtonElement } from "../ButtonElement/ButtonElement";
import styles from "./FooterElement.module.css";

export const FooterElement: React.FC = () => {
  return (
    <footer className={styles.footerElement}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logo}>Next</div>
          <div className={styles.links}>
            <NavigationLink href="/">Home</NavigationLink>
            <NavigationLink href="/about">About</NavigationLink>
            <NavigationLink href="/terms-and-conditions">
              Terms & Conditions
            </NavigationLink>
            <NavigationLink href="/cookie-policy">Cookie Policy</NavigationLink>
            <NavigationLink href="/privacy-policy">
              Privacy Policy
            </NavigationLink>
            <NavigationLink href="/frequently-asked-questions">
              FAQ
            </NavigationLink>
          </div>
          <ButtonElement
            primary={false}
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </ButtonElement>
        </div>
        <div className={styles.bottomSection}>
          <p>
            This prototype is part of a bachelor thesis project by Tommaso De
            Marco |{" "}
            <a
              href="https://github.com/tommydemarco/prototype-ecommerce-next"
              target="_blank"
            >
              View the source code
            </a>
          </p>
          <p>
            The placeholder product images are based on a photo by Sameer
            Kalani, downloaded from Pexels.com
          </p>
        </div>
      </div>
    </footer>
  );
};
