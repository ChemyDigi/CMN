// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0), // ⛔ Expire cookie
  });

  return NextResponse.json({ success: true });
}
