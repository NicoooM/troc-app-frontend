import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import LogoIcon from "@/src/app/icons/LogoIcon";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useMemo } from "react";
import { clearUser } from "@/src/redux/slices/userSlice";
import styles from "./Header.module.scss";
import { CaretDown, MagnifyingGlass, User } from "phosphor-react";
import Dropdown from "../dropdown/Dropdown";
import { RootState } from "@/src/redux/store/store";
import {
  getTokenFromCookie,
  removeAuthorization,
} from "@/src/utils/authorizations";
import { useRouter } from "next/router";
import Search from "../search/Search";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const logout = () => {
    dispatch(clearUser());
    removeAuthorization();
    router.push("/");
  };

  const renderSwapButton = useMemo(() => {
    if (user.email) {
      return (
        <Link
          href={"/articles/creer-un-article"}
          className="m-button m-button--green m-button--fit-content"
        >
          Echanger mon objet
        </Link>
      );
    } else {
      return (
        <Link
          href={"/compte/connexion"}
          className="m-button m-button--green m-button--fit-content"
        >
          Echanger mon objet
        </Link>
      );
    }
  }, [user.email]);

  const renderAccountButton = useMemo(() => {
    if (user.email) {
      return (
        <div className={styles.account}>
          <Dropdown>
            <summary aria-label="Gérer mon compte" className={styles.user}>
              <div className={styles.userIconWrapper}>
                <User className={styles.userIcon} weight="fill" />
              </div>
              <CaretDown weight="fill" className={styles.caretIcon} />
            </summary>
            <div className="m-details__content">
              <div className={styles.accountName}>
                <p>{user.username}</p>
              </div>
              <ul>
                <li className={styles.accountItem}>
                  <Link href={"/compte/mon-compte"}>Mon compte</Link>
                </li>
                <li className={styles.accountItem} onClick={logout}>
                  <button>Se déconnecter</button>
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <Link href={"/compte/connexion"} className={styles.account}>
          <User className={styles.userIcon} />
          <p className={styles.myAccount}>Mon compte</p>
        </Link>
      );
    }
  }, [user.email]);

  return (
    <ProfileLayout>
      <header className={styles.wrapper}>
        <div className="container">
          <div className={styles.nav}>
            <Link href={"/"} title="Revenir à l'accueil">
              <LogoIcon />
              <span className="sr-only">Revenir à l'accueil</span>
            </Link>
            <Search />
            {renderSwapButton}
            {renderAccountButton}
          </div>
        </div>
      </header>
    </ProfileLayout>
  );
};

export default Header;
