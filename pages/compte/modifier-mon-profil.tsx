import ProfilLayout from "@/src/account/components/profil-layout/ProfilLayout";
import Layout from "@/src/app/components/layout/Layout";
import { RootState } from "@/src/redux/store/store";
import { useSelector } from "react-redux";
import styles from "@/styles/pages/EditProfile.module.scss";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ProfilLayout needAuth={true}>
      <Layout>
        <div className="container">
          <div className={styles.wrapper}>
            <h1>Modifier mon compte</h1>
          </div>
        </div>
      </Layout>
    </ProfilLayout>
  );
};

export default EditProfile;
