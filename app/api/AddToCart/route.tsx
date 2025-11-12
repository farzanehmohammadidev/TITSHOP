import Cart from "@/models/cart";
import { verify, JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { getCookie } from "cookies-next";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function POST(req: any): Promise<Response> {
  try {
    await connectDB();
    const token = await getCookie("token", { req });
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) throw new Error("توکن موجود نیست");

    const decoded = verify(token, secret) as JwtPayload;
    const email: string = decoded.email!;
    const product: {
      _id: string;
      name: string;
      image?: string;
      price: string;
      desc?: string;
      category: string;
    } = await req.json();

    let userCart = await Cart.findOne({ email });

    if (!userCart) {
      userCart = await Cart.create({
        email,
        role: decoded.role || "user",
        cart: [product],
      });
    } else {
      userCart.cart.push(product);
      await userCart.save();
    }

    return Response.json(
      { message: "محصول با موفقیت به سبد خرید اضافه شد" },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message || "خطا در افزودن به سبد خرید" },
      { status: 500 }
    );
  }
}
