import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete({
    name: "token",
    path: "/",
    domain: "localhost" 

  });
  return new Response("Cookie removed", { status: 200 });
}
