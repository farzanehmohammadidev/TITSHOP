"use client";
import React from "react";
import styles from "@/app/ProductCard.module.css";
import Image from "next/image";

type PageProps = {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
  params: {
    id: string;
    [key: string]: any;
  };
};

async function page({
  _id,
  name,
  image,
  price,
  desc,
  category,
  params,
}: PageProps) {
  const {id} = params;
 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/phone`);
const data = await res.json();
const item = data.find((item: any) => item._id === id);
  const cartHandler = async () => {
    const productData = { _id, name, image, price, desc, category };
    const res = await fetch("/api/getToken", { credentials: "include" });
    const data = await res.json();

    await fetch("/api/AddToCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
      <div className="h-[300px]">
        <Image
          width={1200}
          height={400}
          className="w-full h-full object-contain"
          src={item.image}
          alt=""
        />
      </div>
      <div>
        <h3>نام دستگاه: {item.name}</h3>
        <p>توضیحات: {item.desc}</p>
        <p>قیمت: {item.price} </p>
        <p>قیمت: {item.brand} </p>
        <p>برند: {item.brand}</p>
        <button className={styles.cardButton} onClick={cartHandler}>
          خرید
        </button>
      </div>
    </div>
  );
}

export default page;
