import { resetPassword } from "@/src/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [data, setData] = useState<any>({
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof token !== "string") return toast.error("Token invalide");
      await resetPassword({
        password: data.password,
        token,
      });
      toast.success("Mot de passe modifié avec succès");
      router.push("/compte/connexion");
    } catch (error: any) {
      console.log(error);
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
            <h1 className={styles.title}>Mot de passe oublié</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="password" className="m-label">
                  Nouveau mot de passe
                </label>
                <div className="m-input">
                  <input
                    id="password"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    onChange={handleChange}
                    name="password"
                    value={data.password}
                    required
                  />
                </div>
              </div>
              <div className={styles.formInput}>
                <label htmlFor="passwordConfirm" className="m-label">
                  Confirmer le mot de passe
                </label>
                <div className="m-input">
                  <input
                    id="passwordConfirm"
                    type="password"
                    placeholder="Adresse mail"
                    onChange={handleChange}
                    name="passwordConfirm"
                    value={data.passwordConfirm}
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
              <p className={styles.forgot}>
                <Link href={"/compte/connexion"}>Annuler</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
