import { login } from "@/src/app/services/auth.service";
import { useState } from "react";
import { LoginUser } from "@/src/app/types/user";
import { setTokenCookie } from "@/src/app/utils/authorizations";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/src/styles/pages/Account.module.scss";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ConnexionPage() {
  const router = useRouter();
  const [user, setUser] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { access_token } = await login(user);
      toast.success("Vous êtes connecté");
      setTokenCookie(access_token);
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main className={styles.wrapper}>
        <div className={styles.image}>
          <Image src="/images/login.jpg" fill alt="" />
        </div>
        <div className={styles.form}>
          <h1 className={styles.title}>Se connecter</h1>
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
                  value={user.email}
                  required
                />
              </div>
            </div>
            <div className={styles.formInput}>
              <label htmlFor="password" className="m-label">
                Mot de passe
              </label>
              <div className="m-input">
                <input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  name="password"
                  value={user.password}
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
              <Link href={"/compte/mot-de-passe-oublie"}>
                Mot de passe oublié ?
              </Link>
            </p>
            <p className={styles.register}>
              Pas de compte ?{" "}
              <Link href={"/compte/inscription"}>S'inscrire</Link>
            </p>
          </form>
        </div>
      </main>
    </Layout>
  );
}
