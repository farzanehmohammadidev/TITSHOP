import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // استاندارد Next.js
import jwt, { JwtPayload } from "jsonwebtoken";
import Cart from "@/models/cart";
import { connectDB } from "@/utils/conectDB";


export async function GET() {
  try {
    await connectDB();
const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json({ message: "توکن یافت نشد" }, { status: 401 });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, secret) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "توکن نامعتبر است" }, { status: 401 });
    }

    const email = decoded.email;
    const cart = await Cart.find({ email });

    if (!cart || cart.length === 0) {
      return NextResponse.json({ message: "سبد خرید خالی است" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (err) {
    console.error("خطا در /api/shop:", err);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
