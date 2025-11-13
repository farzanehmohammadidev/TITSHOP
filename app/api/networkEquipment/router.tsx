import NetworkEquipment from "@/models/networkEquipment";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const networkEquipment = await NetworkEquipment.find();

    if (!networkEquipment || networkEquipment.length === 0) {
      return Response.json(
        { message: "هیچ موبایلی پیدا نشد" },
        { status: 404 }
      );
    }

    return Response.json(networkEquipment, { status: 200 });
  } catch (err: unknown) {
    console.error(" خطا در /api/phone:", err);
    return Response.json(
      { error: "خطا در دریافت داده‌ها از دیتابیس" },
      { status: 500 }
    );
  }
}
