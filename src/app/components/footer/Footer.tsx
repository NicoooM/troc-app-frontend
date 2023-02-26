import LogoIcon from "../../icons/LogoIcon";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className="container">
        <div className="m-grid">
          <div className="m-grid__item">
            <LogoIcon />
            <p className={styles.link}>© 2023 TradeHub</p>
          </div>
          <div className="m-grid__item">
            <p className={styles.title}>Le site</p>
            <p className={styles.link}>Tous les articles</p>
            <p className={styles.link}>Echanger mon objet</p>
            <p className={styles.link}>Rechercher dans le site</p>
            <p className={styles.link}>A propos</p>
          </div>
          <div className="m-grid__item">
            <p className={styles.title}>Compte</p>
            <p className={styles.link}>© 2023 TradeHub</p>
          </div>
          <div className="m-grid__item">
            <p className={styles.title}>Juridique</p>
            <p className={styles.link}>© 2023 TradeHub</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
