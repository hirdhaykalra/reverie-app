// had to redo logic for middleware due to error with sessions and rerouting to new landing page
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  // matcher was becoming more complicated so broke it down
  matcher: ["/dreams", "/profile/:path*", "/post"],
};
