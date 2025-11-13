"use client";

import ProductCard from "@/components/productCard/ProductCard";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
interface networkEquipment {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}
 function NetworkEquipment() {
   const [networkEquipments, setNetworkEquipments] = useState<networkEquipment[]>([]);
 useEffect(() => {
    async function fetchnetworkEquipments() {
      try {
        const networkEquipmentRse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/networkEquipment`,
          { cache: "no-store" }
        );

        if (!networkEquipmentRse.ok) {
          const text = await networkEquipmentRse.text();
          throw new Error(`Request failed: ${networkEquipmentRse.status} - ${text}`);
        }

        const networkEquipmentData: networkEquipment[] = await networkEquipmentRse.json();
        setNetworkEquipments(networkEquipmentData);
      } catch{
        console.error("err");
      }
    }

    fetchnetworkEquipments();
  }, []);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {networkEquipments.map((item) => (
        <li key={item._id}>
          <ProductCard {...item} />
        </li>
      ))}
    </ul>
    </>
  );
}

export default NetworkEquipment;
