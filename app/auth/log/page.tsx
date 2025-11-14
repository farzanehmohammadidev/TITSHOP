"use client";
import React, { useContext } from "react";
import styles from "@/app/form.module.css";
import { useRouter } from "next/navigation";
import IsLoginContext from "@/context/IsLogin/isLogin";

const Log: React.FC = () => {
  const { islog, setIslog } = useContext(IsLoginContext);
  const router = useRouter();
  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
      
         const resToken = await fetch("/api/getToken");
         const token = await resToken.json();
         if (token) return setIslog(true);
    } catch (err) {
      console.error(err);
      alert("خطا در ورود");
    }
  };
console.log(islog);

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
