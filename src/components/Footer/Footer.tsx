import { Link } from "../Link/Link";
import { Button } from "../Button/Button";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.logo}>Next</div>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <Button
            primary={false}
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
        <div className={styles.bottomSection}>
          <p>
            &copy; 2024 Tommaso De Marco |{" "}
            <a
              href="https://github.com/tommydemarco/prototype-ecommerce-next"
              target="_blank"
            >
              View the source code
            </a>
          </p>
          <p>Bachelor thesis project - prototype</p>
        </div>
      </div>
    </footer>
  );
};
