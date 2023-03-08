import { login } from "@/src/services/auth.service";
import { useState } from "react";
import { LoginUser } from "@/src/types/user";
import { setTokenCookie } from "@/src/utils/authorizations";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
            <h1 className={styles.title}>Se connecter</h1>
            <form onSubmit={onSubmit}>
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
              <p className={styles.register}>
                Pas de compte ?{" "}
                <Link href={"/compte/inscription"}>S'inscrire</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
