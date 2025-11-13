"use client";
import ProductCard from "@/components/productCard/ProductCard";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
interface Laptop {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}
function Laptop() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  useEffect(() => {
    async function fetchLaptops() {
      try {
        const laptopRse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/laptop`,
          { cache: "no-store" }
        );

        if (!laptopRse.ok) {
          const text = await laptopRse.text();
          throw new Error(`Request failed: ${laptopRse.status} - ${text}`);
        }

        const laptopData: Laptop[] = await laptopRse.json();
        setLaptops(laptopData);
      } catch {
        console.error("err");
      } 
    }

    fetchLaptops();
  }, []);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {laptops.map((item) => (
          <li key={item._id}>
            <ProductCard {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Laptop;
