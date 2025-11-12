import HomeAppliances from "@/models/homeAppliances";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectDB();

    const homeAppliances = await HomeAppliances.find();

    if (!homeAppliances || homeAppliances.length === 0) {
      return Response.json(
        { message: "هیچ لوازمی پیدا نشد" },
        { status: 404 }
      );
    }

    return Response.json(homeAppliances, { status: 200 });
  } catch (err: any) {
    console.error(" خطا در /api/homeAppliances:", err);
    return Response.json(
      { error: "خطا در دریافت داده‌ها از دیتابیس" },
      { status: 500 }
    );
  }
}
