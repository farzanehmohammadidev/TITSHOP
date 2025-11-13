import Console from "@/models/consoles";
import { connectDB } from "@/utils/conectDB";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    const consoles = await Console.find();
    return Response.json(consoles);
  } catch {
    console.log("err");
    return new Response(JSON.stringify({ error: "Failed to fetch consoles" }), {
      status: 500,
    });
  }
}
