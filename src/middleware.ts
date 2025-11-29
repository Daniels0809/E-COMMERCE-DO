import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const {pathname} = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/products", "/about"];

  const adminRoutes = ["/dashboard"];

  if (protectedRoutes.some(r => pathname.startsWith(r))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (adminRoutes.some(r => pathname.startsWith(r))) {
    if (token &&token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/products", "/about"] }