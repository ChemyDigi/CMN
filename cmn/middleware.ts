// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname.startsWith("/admin/login");

  if (!isAdminPage) return NextResponse.next();
  if (isLoginPage) return NextResponse.next();

  const session = req.cookies.get("admin_session");

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
