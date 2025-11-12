import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(req : Request) {
  const ed = await cookies()
  const token = ed.get("token")?.value
  const secret = process.env.JWT_SECRET;  
  console.log(ed);
  
  try {

  if (!token || !secret) {
    return NextResponse.json("توکن یا سکرت غلطه");
  }

    const decoded = verify(token, secret) as JwtPayload;

    if (!decoded.email) return NextResponse.json("ایمیل وجود ندارد");
    return NextResponse.json(token);
  } catch {
    return NextResponse.json('error server');
  }
}
