import { register } from "@/src/services/auth.service";
import { useState } from "react";
import { RegisterUser } from "@/src/types/user";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function InscriptionPage() {
  const router = useRouter();
  const [user, setUser] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
    city: "",
    postalCode: 0,
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await register(user);
      router.push("/connexion");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className="container">
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <Image
              src="https://images.unsplash.com/photo-1677629828024-7793ff7d9403?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
              fill
              alt=""
            />
          </div>
          <div className={styles.form}>
            <h1 className={styles.title}>Créer un compte</h1>
            <form onSubmit={onSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="" className="m-label">
                  Nom utilisateur
                </label>
                <div className="m-input">
                  <input
                    type="text"
                    placeholder="Nom utilisateur"
                    onChange={handleChange}
                    name="username"
                    value={user.username}
                    required
                  />
                </div>
              </div>
              <div className={styles.formInput}>
                <label htmlFor="" className="m-label">
                  Adresse mail
                </label>
                <div className="m-input">
                  <input
                    type="email"
                    placeholder="Adresse mail"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    required
                  />
                </div>
              </div>
              <div className={styles.formInput}>
                <label htmlFor="" className="m-label">
                  Mot de passe
                </label>
                <div className="m-input">
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    required
                  />
                </div>
              </div>
              <div className={styles.formInput}>
                <label htmlFor="" className="m-label">
                  Confirmer le mot de passe
                </label>
                <div className="m-input">
                  <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    onChange={handlePasswordConfirmChange}
                    name="passwordConfirm"
                    value={passwordConfirm}
                    required
                  />
                </div>
              </div>
              <button
                className="m-button m-button--green m-button--fit-content"
                type="submit"
              >
                Continuer
              </button>
            </form>
            <p className={styles.register}>
              Déjà un compte ?{" "}
              <Link href={"/compte/connexion"}>Se connecter</Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
