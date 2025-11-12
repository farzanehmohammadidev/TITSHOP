import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import React from "react";
import CartItem from "./CartItem";
export const dynamic = "force-dynamic";

const ShopPage= async (req:any) => {
const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;
  if (!token) return redirect("/auth/log")
   
    return (
    <div className="p-4">
      <CartItem />
    </div>
  );
};

export default ShopPage;
