"use client";
import React, { useState } from "react";
import styles from "@/app/form.module.css";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formDataRegister, setFormDataRegister] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(formDataRegister),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.formBox}>
        <input
          className={styles.inputField}
          placeholder="نام خود را وارد کنید"
          onChange={(e) =>
            setFormDataRegister({ ...formDataRegister, name: e.target.value })
          }
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="ایمیل خود را وارد کنید"
          onChange={(e) =>
            setFormDataRegister({ ...formDataRegister, email: e.target.value })
          }
        />
        <div>
          <input
            className={styles.inputField}
            type="text"
            placeholder="پسوورد خود را وارد کنید"
            onChange={(e) =>
              setFormDataRegister({ ...formDataRegister, password: e.target.value })
            }
          />
        </div>
        <button className={styles.submitBtn} onClick={clickHandler}>
          ثبت نام
        </button>
      </div>
    </form>
  );
};

export default Register;
