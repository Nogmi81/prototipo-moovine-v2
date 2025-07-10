"use client";

import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, authLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(false);
  
  if (!user && !authLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.msgDeslogado}>
          <span className={styles.linkHome}>
            <Link href="/">
              Ir pra Home
            </Link>
          </span>
          <p>Você não está logado.</p> 
          <p>Para acessar o Dashboard faça login novamente: </p>
          <p className={styles.linkLogin}>
            <Link href="/Login">
              Login
            </Link>
          </p>          
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <div className={styles.mainDashboard}>
          <h1>Bem-vindo, {user.displayName || user.email || "usuário"}!</h1>
          <h1>Dashboard</h1>          
        </div>
      </div>
    );
  }

  return null;
}
