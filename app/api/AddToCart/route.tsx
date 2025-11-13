import Cart from "@/models/cart";
import { verify, JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/utils/conectDB";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
const ed = await cookies()
  const token = ed.get("token")?.value   
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      return Response.json(
        { error: err.message },
        { status: 500 }
      );
    } else {
      console.log("Unknown error", err);
      return Response.json(
        { error: "خطای ناشناخته رخ داده است" },
        { status: 500 }
      );
    }
  }
}