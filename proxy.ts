import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin/login";

  if (!isAdminRoute) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
