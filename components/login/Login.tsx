"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/form.module.css";
import { useRouter } from "next/navigation";
import { action_Data } from "./action";
interface RegisterForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
  });
   const router = useRouter();
useEffect(()=>{
 const checkToken = async () => {
      const res = await fetch("/api/getToken", { credentials: "include" });
      const data = await res.json();
      
      if (data) {
      router.push('/')
        
      }
    };
  checkToken()
  
},[])
 
  

  return (
    <form className={styles.formContainer} action={action_Data}>
      <div className={styles.formBox}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="ایمیل خود را وارد کنید"
        />
        <div>
          <input
            className={styles.inputField}
            type="password"
            placeholder="پسورد خود را وارد کنید"
            
          />
        </div>

        <button className={styles.submitBtn} type="submit" onClick={(e)=>e.preventDefault()}>
          ورود
        </button>
      </div>
    </form>
  );
};

export default Login;
