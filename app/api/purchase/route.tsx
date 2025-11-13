import { NextResponse } from "next/server";
import { connectDB } from "@/utils/conectDB";
import Cart from "@/models/cart";
import Purchased from "@/models/purchased";
import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

interface IProduct {
  _id: string;
  name: string;
  image?: string;
  price: string;
  desc?: string;
  category?: string;
  purchasedAt?: Date;
}

interface IPurchased {
  email: string;
  role?: string;
  purchased: IProduct[];
}

type PurchasedDocType = HydratedDocument<IPurchased>;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { productId } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) 
      return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });

    const decoded = verify(token, secret) as JwtPayload;
    const email = decoded.email;

    const cart = await Cart.findOne({ email });
    if (!cart) 
      return NextResponse.json({ error: "سبد خرید پیدا نشد" }, { status: 404 });

    const index = cart.cart.findIndex((item: IProduct) => item._id.toString() === productId);
    if (index === -1) 
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });

    const purchasedProduct = cart.cart[index];
    cart.cart.splice(index, 1);
    await cart.save();

    const purchasedDoc = await Purchased.findOne({ email }) as PurchasedDocType | null;
    if (purchasedDoc) {
      purchasedDoc.purchased.push(purchasedProduct);
      await purchasedDoc.save();
    } else {
      await Purchased.create({ email, purchased: [purchasedProduct] });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
