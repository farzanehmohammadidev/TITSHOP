"use client";
import React, { useState, useEffect } from "react";
import IsLoginContext from "./context/IsLogin/isLogin";

interface Props {
  children: React.ReactNode;
}

const ContextLogProvider: React.FC<Props> = ({ children }) => {
  const [islog, setIslog] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const res = await fetch("/api/getToken", { cache: "no-store" });
      const data = await res.json();
      setIslog(!!data?.token);
    }
    checkLogin();
  }, []);

  return (
    <IsLoginContext.Provider value={{ islog, setIslog }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default ContextLogProvider;
