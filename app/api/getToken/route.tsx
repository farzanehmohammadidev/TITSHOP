import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({ isLoggedIn: true });
}
