import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import Layout from "@/src/app/components/layout/Layout";
import ProfileInfos from "@/src/profile/components/profile-infos/ProfileInfos";
import { RootState } from "@/src/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/pages/Profile.module.scss";
import Link from "next/link";
import { MagnifyingGlass, PencilSimple, Plus, SignOut } from "phosphor-react";
import { removeAuthorization } from "@/src/utils/authorizations";
import { clearUser } from "@/src/redux/slices/userSlice";
import { useRouter } from "next/router";

const MyAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const logout = () => {
    removeAuthorization();
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <ProfilLayout needAuth={true}>
      <Layout>
        <div className="container">
          <div className={styles.wrapper}>
            <p className={styles.title}>Mon profil</p>
            <div className={styles.head}>
              <div className={styles.profileInfos}>
                <ProfileInfos user={user} itemsCount={10} />
              </div>
              <div className={styles.profileSetting}>
                <ul>
                  <li className={styles.profileSettingItem}>
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="/articles/creer-un-article"
                    >
                      <Plus />
                      Créer une offre
                    </Link>
                  </li>
                  <li className={styles.profileSettingItem}>
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="#"
                    >
                      <PencilSimple />
                      Modifier mon profil
                    </Link>
                  </li>
                  <li className={styles.profileSettingItem}>
                    <button
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      onClick={logout}
                    >
                      <SignOut />
                      Me déconnecter
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.articles}>
              <div className={styles.articlesHead}>
                <h2 className={styles.articlesTitle}>Mes offres en cours</h2>
                <div className={styles.search}>
                  <div className="m-input">
                    <MagnifyingGlass />
                    <input type="text" placeholder="Rechercher" name="search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProfilLayout>
  );
};

export default MyAccount;
