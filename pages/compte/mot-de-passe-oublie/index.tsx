import { forgotPassword } from "@/src/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await forgotPassword(email);
      router.push("/compte/mot-de-passe-oublie/confirmation");
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
                <label htmlFor="email" className="m-label">
                  Adresse mail
                </label>
                <div className="m-input">
                  <input
                    id="email"
                    type="email"
                    placeholder="Adresse mail"
                    onChange={handleChange}
                    name="email"
                    value={email}
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
