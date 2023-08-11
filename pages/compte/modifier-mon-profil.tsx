import ProfileLayout from "@/src/profile/components/profile-layout/ProfileLayout";
import Layout from "@/src/app/components/layout/Layout";
import { RootState } from "@/src/app/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/styles/pages/EditProfile.module.scss";
import { useEffect, useState } from "react";
import { UpdateUser } from "@/src/app/types/user";
import { updateUser } from "@/src/app/services/user.service";
import { useRouter } from "next/router";
import { setUser } from "@/src/app/redux/slices/userSlice";

const EditProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<UpdateUser>({} as UpdateUser);

  useEffect(() => {
    setUserData(user);
    if (user.username) {
      setMounted(true);
    }
  }, [user]);

  const handleChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await updateUser(userData);
      dispatch(setUser(data));
      router.push("/compte/mon-compte");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileLayout needAuth={true}>
      <Layout>
        <div className="container">
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Modifier mon compte</h1>
            {mounted && (
              <form onSubmit={handleSubmit}>
                <div className={styles.inputsRow}>
                  <div className={styles.inputItem}>
                    <label htmlFor="username" className="m-label">
                      Nom d'utilisateur
                    </label>
                    <div className="m-input">
                      <input
                        type="text"
                        id="username"
                        placeholder="Nom d'utilisateur"
                        onChange={handleChangeUserData}
                        name="username"
                        value={userData.username}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputItem}>
                    <label htmlFor="city" className="m-label">
                      Ville
                    </label>
                    <div className="m-input">
                      <input
                        type="text"
                        id="city"
                        placeholder="Ville"
                        onChange={handleChangeUserData}
                        name="city"
                        value={userData.city}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="m-button m-button--green m-button--fit-content"
                  type="submit"
                >
                  Modifier mon profil
                </button>
              </form>
            )}
          </div>
        </div>
      </Layout>
    </ProfileLayout>
  );
};

export default EditProfile;
