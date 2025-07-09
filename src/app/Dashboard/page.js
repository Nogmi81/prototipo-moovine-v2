// src/app/page.js
"use client";

import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
// import { PasswordResetForm } from "./components/PasswordResetForm/PasswordResetForm";
import { useAuth } from "../contexts/AuthContext";
// import loading from "../../../public/loading.gif";
import { useRouter, useSearchParams } from "next/navigation"; // Importa useSearchParams

export default function Dashboard() {
  const { user, authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook para ler parâmetros da URL
  const [shouldShowMessage, setShouldShowMessage] = useState(false);

  useEffect(() => {
    if (!user && !authLoading) {
      const isLogoutRedirect = searchParams.get("logout") === "true";

      if (isLogoutRedirect) {
        router.replace("/Login");
      } else {
        const timer = setTimeout(() => {
          setShouldShowMessage(true);
        }, 1000); // Delay para exibir a mensagem

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado ou as dependências mudarem
      }
    } else {
      // Se o usuário está logado ou a autenticação está carregando,
      // a mensagem não deve ser exibida, então resetamos o estado.
      setShouldShowMessage(false);
    }
  }, [user, authLoading, searchParams, router]); // Dependências do useEffect

  //    Se o usuário está logado, exiba o conteúdo do Dashboard.
  if (user) {
    return (
      <div>
        <div className={styles.mainDashboard}>
          <h1>Bem-vindo, {user.displayName || user.email || "usuário"}!</h1>
          {/* <PasswordResetForm /> */}
          <h1>Dashboard</h1>
          {/* <PerfilUsuario /> */}
        </div>
      </div>
    );
  }

//   if (authLoading) {
//     return (
//       <p className={styles.loading}>
//         <Image src={loading} alt="Carregando autenticação..." />
//       </p>
//     );
//   }

  if (!user && !authLoading && shouldShowMessage) {
    return (
      <div className={styles.container}>
        <div className={styles.msgDeslogado}>
          <p>Você não está logado.</p>
          <p>Para acessar o Dashboard faça login novamente: </p>
          <br></br>
          <span className={styles.linkLogin}>
            <Link href="/Login">Login</Link>
          </span>
        </div>
      </div>
    );
  }

  return null;
}
