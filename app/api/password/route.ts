import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data: { password: string } = await request.json();
  const password = data.password.toLowerCase();

  if (password !== process.env.RSVP_PASSWORD) {
    return new Response(
      JSON.stringify({ message: "Incorrect password. Please try again." }),
      {
        status: 401,
      }
    );
  }

  const cookie = (await cookies()).set("isLoggedIn", "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 1, // 1 hour
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Cookie set" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie.toString(),
    },
  });
}
