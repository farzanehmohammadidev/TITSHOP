import User from "@/models/user";
import { connectDB } from "@/utils/conectDB";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = await req.json();
  await connectDB();
  if (!name.trim() || !email.trim() || !password.trim())
    return Response.json("فیلدها خالیه");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return Response.json("الگو ایمیل صحیح نیست");
  if (password.length < 8 || password.length > 20)
    return Response.json("پسورد باید بین 8 تا 20 کاراکتر باشد");

  const isEmailExits = await User.findOne({ email });
  if (isEmailExits) return Response.json("ایمیل از قبل هست");

  const hashedPass: string = await bcrypt.hash(password, 10);
  const countUser: number = await User.countDocuments();
  const role: string = countUser < 1 ? "admin" : "user";

  await User.create({ name, email, role, password: hashedPass });
  return Response.json("کاربر با موفقیت ثبت شد");
}
