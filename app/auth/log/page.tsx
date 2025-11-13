"use client";
import React from "react";
import styles from "@/app/form.module.css";
import { useRouter } from "next/navigation";

const Log: React.FC = () => {
  const router = useRouter();
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      alert("لطفاً ایمیل و پسورد خود را وارد کنید");
      return;
    }

    try {
      const res = await fetch("/api/auth/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await res.json();

      if (data.success) {
        router.push("/"); 
      } else {
        alert("ایمیل یا رمز اشتباه است");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ورود");
    }  };

  return (
    <form className={styles.formContainer} onSubmit={loginHandler}>
      <div className={styles.formBox}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="ایمیل خود را وارد کنید"
          name="email"
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="پسوورد خود را وارد کنید"
          name="password"
        />
        <button className={styles.submitBtn} type="submit">
          ورود
        </button>
      </div>
    </form>
  );
};

export default Log;
