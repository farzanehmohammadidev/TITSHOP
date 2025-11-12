import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const { email, password }: { email: string; password: string } =
      await req.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "فیلدها خالیه" }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "الگوی ایمیل صحیح نیست" },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 20) {
      return NextResponse.json(
        { error: "پسورد باید بین 8 تا 20 کاراکتر باشد" },
        { status: 400 }
      );
    }
const normalizedEmail = email.trim().toLowerCase();
const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { error: "این کاربر وجود ندارد" },
        { status: 404 }
      );
    }
console.log(await bcrypt.compare(password, user.password))
    const isValidPass: boolean = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return NextResponse.json(
        { error: "رمز عبور اشتباه است" },
        { status: 401 }
      );
    }

    const token: string = jwt.sign(
      { email: user.email, role: user.rol },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

    const cookie = serialize("token", token, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2,
    });
 const response = NextResponse.json({ success: true, message: "تبریک! شما وارد سایت شدید" });
    response.headers.set("Set-Cookie", cookie);
    revalidatePath("/");
    return response;

  } catch (err: any) {
return NextResponse.json({ success: false, error: "خطا در سرور" }, { status: 500 });  }
}
