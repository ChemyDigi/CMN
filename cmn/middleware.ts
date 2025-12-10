// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;

  const isLoggedIn = !!token;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  // If not logged in and trying to access admin pages → redirect to login
  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // If logged in and trying to visit login → redirect to dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
