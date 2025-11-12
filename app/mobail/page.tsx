"use client";
import ProductCard from "@/components/productCard/ProductCard";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
interface Phone {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}
 function Phone() {
   const [Phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 useEffect(() => {
    async function fetchPhones() {
      try {
        const phoneRse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/phone`,
          { cache: "no-store" }
        );

        if (!phoneRse.ok) {
          const text = await phoneRse.text();
          throw new Error(`Request failed: ${phoneRse.status} - ${text}`);
        }

        const phoneData: Phone[] = await phoneRse.json();
        setPhones(phoneData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPhones();
  }, []);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {Phones.map((item) => (
        <li key={item._id}>
          <ProductCard {...item} />
        </li>
      ))}
    </ul>
    </>
  );
}

export default Phone;
