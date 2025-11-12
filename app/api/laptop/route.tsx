import Laptop from "@/models/laptop";
import { connectDB } from "@/utils/conectDB";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectDB();

    const laptop = await Laptop.find();

    if (!laptop || laptop.length === 0) {
      return Response.json(
        { message: "هیچ موبایلی پیدا نشد" },
        { status: 200 }
      );
    }

    return Response.json(laptop, { status: 200 });
  } catch (err: any) {
    console.error(" خطا در /api/phone:", err);
    return Response.json(
      { error: "خطا در دریافت داده‌ها از دیتابیس" },
      { status: 500 }
    );
  }
}
