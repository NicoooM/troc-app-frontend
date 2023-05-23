import { forgotPassword } from "@/src/app/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/src/app/components/layout/Layout";
import styles from "@/styles/pages/Account.module.scss";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgotPasswordConfirmPage() {
  return (
    <Layout>
      <main className={styles.wrapper}>
        <div className={styles.image}>
          <Image src="/images/register.jpg" fill alt="" />
        </div>
        <div className={styles.form}>
          <h1 className={styles.titleForgotPassword}>
            Un mail vous a été envoyé à l'adresse que vous avez indiquée
          </h1>
          <Link
            href={"/"}
            className="m-button m-button--green m-button--fit-content"
          >
            Revenir à l’accueil
          </Link>
        </div>
      </main>
    </Layout>
  );
}
