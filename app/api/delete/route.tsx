import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    console.log("شروع حذف محصول...");
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json(
        { error: "احراز هویت انجام نشده" },
        { status: 401 }
      );
    }

    const decoded = verify(token, secret) as JwtPayload;
    const { email } = decoded;

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json(
        { error: "شناسه محصول ارسال نشده" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ email });
    if (!cart) {
      return NextResponse.json({ error: "سبد خرید پیدا نشد" }, { status: 404 });
    }

    const index = cart.cart.findIndex(
      (item: any) => item._id?.toString() === productId
    );

    if (index === -1) {
      return NextResponse.json(
        { error: "محصول در سبد یافت نشد" },
        { status: 404 }
      );
    }

    cart.cart.splice(index, 1);
    await cart.save();

    return NextResponse.json({ message: "محصول با موفقیت حذف شد" });
  } catch (err: any) {
    console.error("خطا در حذف محصول:", err.message || err);
    return NextResponse.json(
      { error: err.message || "خطا در سرور" },
      { status: 500 }
    );
  }
}
