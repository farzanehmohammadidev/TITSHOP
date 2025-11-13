"use client";
import ProductCard from "@/components/productCard/ProductCard";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
interface homeAppliances {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}
function HomeAppliances() {
  const [homeAppliancess, sethomeAppliancess] = useState<homeAppliances[]>([]);
  useEffect(() => {
    async function fetchhomeAppliancess() {
      try {
        const homeAppliancesRse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/homeAppliances`,
          { cache: "no-store" }
        );

        if (!homeAppliancesRse.ok) {
          const text = await homeAppliancesRse.text();
          throw new Error(
            `Request failed: ${homeAppliancesRse.status} - ${text}`
          );
        }

        const laptopData: homeAppliances[] = await homeAppliancesRse.json();
        sethomeAppliancess(laptopData);
      } catch {
        console.error("error");
      }
    }

    fetchhomeAppliancess();
  }, []);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {homeAppliancess.map((item) => (
          <li key={item._id}>
            <ProductCard {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomeAppliances;
