import { NextResponse } from "next/server";

export async function GET() {
  // Clear the cookie by setting it to empty and expired
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
