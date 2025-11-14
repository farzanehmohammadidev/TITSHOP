"use client";

import React, { useState, ReactNode } from "react";
import IsLoginContext from "../IsLogin/isLogin";

interface Props {
  children: ReactNode;
}

const IsLoginProvider: React.FC<Props> = ({ children }) => {
  const [islog, setIslog] = useState(false);

  return (
    <IsLoginContext.Provider value={{ islog, setIslog }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginProvider;
