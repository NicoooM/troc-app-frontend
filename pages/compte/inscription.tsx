import { register } from "@/src/app/services/auth.service";
import { useState } from "react";
import { RegisterUser } from "@/src/app/types/user";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register(user);
      toast.success("Votre compte a bien été créé");
      router.push("/compte/connexion");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main className={styles.wrapper}>
        <div className={styles.image}>
          <Image src="/images/register.jpg" fill alt="" />
        </div>
        <div className={styles.form}>
          <h1 className={styles.title}>Créer un compte</h1>
          <form onSubmit={handleSubmit}>
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
      </main>
    </Layout>
  );
}
