"use client";
import styles from "@/app/ProductCard.module.css";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  price: string;
  desc: string;
  category: string;
}

const CartProduct: React.FC<ProductProps> = ({ _id, name, image, price, email,desc }: any) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: _id }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.reload();
      } else {
        alert(data.error || "خطایی در حذف محصول رخ داد");
      }
    } catch (err) {
      console.error("خطا در حذف محصول:", err);
      alert("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };
const handlePurchase = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: _id }),
      });

      const data = await res.json();
console.log(data);

      if (res.ok) {
        window.location.reload();
      } else {
        alert(data.error || "خطا در انتقال");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className={`${styles.card} flex flex-col justify-center`}>
        <Image
          width={1200}
          height={400}
          className={`${styles.cardImage} , w-full h-auto`}
          src={image}
          alt={name}
          draggable={false}
        />
        <h4 className={`${styles.cardDesc} fa en`}>
          <span className="text-[20px]">{desc}</span>
        </h4>
        <hr />
        <div
          className={`${styles.cardPrice} , flex items-center justify-between`}
        >
          <span className="fa text-md">قیمت: </span>
          <span className="fa text-md">{price} </span>
        </div>
        <div className="flex justify-end">
          <div className="flex  w-[8 0%]" style={{ margin: "50px 0" }}>
            <button
              className="bg-red-600 fa text-white"
              style={{ padding: "1px 5px" }}
              onClick={handleDelete}
            >
              حذف
            </button>
            <button
              className="bg-green-600 fa text-white"
              style={{ padding: "1px 5px" }}
              onClick={handlePurchase}
            >
              ثبت خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
