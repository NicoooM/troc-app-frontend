import Layout from "@/src/app/components/layout/Layout";
import styles from "@/src/styles/pages/Legal.module.scss";

const Legal = () => {
  return (
    <Layout>
      <main className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Mentions légales</h1>
          <p className={styles.text}>En vigueur au 23/05/2023</p>
          <p className={styles.text}>
            Conformément aux dispositions des Articles 6-III et 19 de la Loi
            n°2004-575 du 21 juin 2004 pour la confiance dans l’économie
            numérique, dite L.C.E.N., il est porté à la connaissance des
            utilisateurs et visiteurs du site trade-hub.fr, les présentes
            mentions légales. La connexion et la navigation sur le site par
            l’utilisateur implique acceptation intégrale et sans réserve des
            présentes mentions légales. Ces dernières sont accessibles sur le
            site à la rubrique « Mentions légales ».
          </p>

          <h2 className={styles.subtitle}>Article 1 - L'éditeur</h2>
          <p className={styles.text}>
            L’édition et la direction de la publication du site est assurée par
            Marsan Nicolas, domiciliée 6 rue Bernard Palissy, 33150 Cenon, dont
            le numéro de téléphone est +33652577922, et l'adresse e-mail
            nmarsan33000@gmail.com.
          </p>

          <h2 className={styles.subtitle}>Article 2 - L'hébergeur</h2>
          <p className={styles.text}>
            L'hébergeur du site est la société Vercel Inc., dont le siège social
            est situé au 340 S Lemon Ave #4133 Walnut, CA 91789 , que l'on peut
            contacter à l'adresse e-mail privacy@vercel.com.
          </p>

          <h2 className={styles.subtitle}>Article 3 - Accès au site</h2>
          <p className={styles.text}>
            Le site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de
            force majeure, interruption programmée ou non et pouvant découlant
            d’une nécessité de maintenance.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default Legal;
