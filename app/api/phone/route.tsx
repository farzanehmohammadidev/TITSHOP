import Phone from "@/models/phone";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectDB();

    const phones = await Phone.find();

    if (!phones || phones.length === 0) {
      return Response.json(
        { message: "هیچ موبایلی پیدا نشد" },
        { status: 404 }
      );
    }

    return Response.json(phones, { status: 200 });
  } catch (err: any) {
    console.error(" خطا در /api/phone:", err);
    return Response.json(
      { error: "خطا در دریافت داده‌ها از دیتابیس" },
      { status: 500 }
    );
  }
}
