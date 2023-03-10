import { forgotPassword } from "@/src/services/auth.service";
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
        </div>
      </main>
    </Layout>
  );
}
