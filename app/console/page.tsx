"use client";
import ProductCard from "@/components/productCard/ProductCard";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

interface TmapProp {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}

const Consoles: React.FC = () => {
  const [consoles, setConsoles] = useState<TmapProp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/console`, { cache: "no-store" });
        const data = await res.json();
        setConsoles(data);
      } catch (err) {
        console.error("Error fetching consoles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-4 text-center">در حال بارگذاری...</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {consoles.map((item) => (
        <li key={item._id}>
          <ProductCard {...item} />
        </li>
      ))}
    </ul>
  );
};

export default Consoles;
