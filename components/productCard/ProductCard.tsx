"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/ProductCard.module.css";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}

const ProductCard: React.FC<ProductProps> = ({
  _id,
  name,
  image,
  price,
  desc,
  category,
}) => {
  const cartHandler = async () => {
    const productData = { _id, name, image, price, desc, category };
    const res = await fetch("/api/getToken", { credentials: "include" });
    const data = await res.json();
      if(!data) return ("ابتدا وارد حساب کاربری خود شوید")
    await fetch("/api/AddToCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  return (
    <div className={`${styles.card} text-[20px]`}>
      <Image
      width={1200}
            height={400}
        className={`${styles.cardImage} ,w-full h-auto `}
        src={image}
        alt={name}
        draggable={false}
      />
         <Link href={`/${_id}`}>
      <h4 className={`${styles.cardDesc}`}><span className="fa en" style={{fontSize:'20px'}}>{desc}</span></h4>
   </Link>

      <hr />
      <h5 className={`${styles.cardPrice} flex items-center justify-between`} style={{fontSize:"17px", margin:'8px'}}><span>قیمت:</span> <span>{price}</span> </h5>
      <button className={`${styles.cardButton} fa`} onClick={cartHandler}>
        خرید
      </button>
    </div>
  );
};

export default ProductCard;
