import { login } from "@/src/services/auth.service";
import { useState } from "react";
import { LoginUser } from "@/src/types/user";
import { setTokenCookie } from "@/src/utils/authorizations";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";

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
      setTokenCookie(access_token);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main>
        <h1>Connexion</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="" className="m-label">
              Adresse mail
            </label>
            <input
              type="email"
              placeholder="Adresse mail"
              onChange={handleChange}
              name="email"
              value={user.email}
              className="m-input"
              required
            />
          </div>
          <div>
            <label htmlFor="" className="m-label">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              name="password"
              value={user.password}
              className="m-input"
              required
            />
          </div>
          <button className="m-button m-button--green" type="submit">
            Se connecter
          </button>
        </form>
      </main>
    </Layout>
  );
}
