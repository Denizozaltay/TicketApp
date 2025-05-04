import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "./lib/auth/getAuthUser";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const user = await getAuthUser();

  // Giriş yapmış kullanıcı login/register sayfasına gitmesin
  const authPages = ["/login", "/register"];
  if (authPages.some((path) => pathname.startsWith(path))) {
    if (user) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // API login/register yolları public
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Tüm API yolları için yetki kontrolü
  if (pathname.startsWith("/api")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Sayfa için yetki kontrolü
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin sayfası için role kontrolü
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/admin", "/login", "/register"],
};
