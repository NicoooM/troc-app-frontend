import Link from "next/link";
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
            <Link href="/" className={styles.link}>
              Accueil
            </Link>
            <Link href="/articles" className={styles.link}>
              Tous les articles
            </Link>
            <Link href="/articles/creer-un-article" className={styles.link}>
              Echanger mon objet
            </Link>
          </div>
          <div className="m-grid__item">
            <p className={styles.title}>Compte</p>
            <Link href="/compte/mon-compte" className={styles.link}>
              Mon compte
            </Link>
            <Link href="/compte/connexion" className={styles.link}>
              Se connecter
            </Link>
            <Link href="/compte/inscription" className={styles.link}>
              S’inscrire
            </Link>
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
