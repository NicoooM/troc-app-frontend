import { register } from "@/src/services/auth.service";
import { useState } from "react";
import { RegisterUser } from "@/src/types/user";
import { useRouter } from "next/navigation";

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
    <main>
      <h1>Inscription</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="" className="m-label">
            Nom utilisateur
          </label>
          <input
            type="text"
            placeholder="Nom utilisateur"
            onChange={handleChange}
            name="username"
            value={user.username}
            className="m-input"
            required
          />
        </div>
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
        <div>
          <label htmlFor="" className="m-label">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            onChange={handlePasswordConfirmChange}
            name="passwordConfirm"
            value={passwordConfirm}
            className="m-input"
            required
          />
        </div>
        <button className="m-button m-button--green" type="submit">
          S'inscrire
        </button>
      </form>
    </main>
  );
}
