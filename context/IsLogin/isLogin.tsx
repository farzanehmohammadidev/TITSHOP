"use client";
import { createContext } from "react";

interface IsLoginContextType {
  islog: boolean;
  setIslog: (value: boolean) => void;
}

const IsLoginContext = createContext<IsLoginContextType>({
  islog: false,
  setIslog: () => {}
});

export default IsLoginContext;
