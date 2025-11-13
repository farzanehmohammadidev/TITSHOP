import User from "@/models/user";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
   await connectDB()
    const user = await User.find();
    return Response.json(user);
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), { status: 500 });
  }
}
