import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import LogoIcon from "@/src/app/icons/LogoIcon";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { setUser } from "@/src/redux/slices/userSlice";
import styles from "./Header.module.scss";
import { MagnifyingGlass, User } from "phosphor-react";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  return (
    <ProfilLayout>
      <nav className={styles.wrapper}>
        <div className="container">
          <div className={styles.nav}>
            <Link href={"/"} title="Revenir à l'accueil">
              <LogoIcon />
              <span className="sr-only">Revenir à l'accueil</span>
            </Link>
            <div className={styles.search}>
              <MagnifyingGlass />
              <input type="text" placeholder="Rechercher un article" />
            </div>
            <Link href={"/articles/creer-un-article"} className="m-button">
              Echanger mon objet
            </Link>
            <div className={styles.account}>
              <User />
              <p>Mon compte</p>
            </div>
          </div>
        </div>
      </nav>
    </ProfilLayout>
  );
};

export default Header;
