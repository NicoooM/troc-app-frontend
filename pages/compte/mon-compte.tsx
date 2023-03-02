import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import Layout from "@/src/app/components/layout/Layout";
import ProfileInfos from "@/src/profile/components/profile-infos/ProfileInfos";
import { RootState } from "@/src/redux/store/store";
import { useSelector } from "react-redux";
import styles from "@/src/profile/pages/Profile.module.scss";
import Link from "next/link";
import { Pencil, PencilSimple, Plus, SignOut } from "phosphor-react";

const MyAccount = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ProfilLayout needAuth={true}>
      <Layout>
        <div className="container">
          <div className={styles.wrapper}>
            <p className={styles.title}>Mon profil</p>
            <div className={styles.head}>
              <div className={styles.profileInfos}>
                <ProfileInfos user={user} />
              </div>
              <div className={styles.profileSetting}>
                <ul>
                  <li className={styles.profileSettingItem}>
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="#"
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
                    <Link
                      className="m-button m-button--grey m-button--center m-button--icon-left"
                      href="#"
                    >
                      <SignOut />
                      Me déconnecter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProfilLayout>
  );
};

export default MyAccount;
