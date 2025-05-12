import { NextRequest, NextResponse } from "next/server";
import { getAuthUserFromRequest } from "./lib/auth/getAuthUser";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const user = await getAuthUserFromRequest(req);

  // Giriş yapmış kullanıcı login/register sayfasına gitmesin
  const authPages = ["/auth/login", "/auth/register"];
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

  // Sayfa için yetki kontrolü
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Tüm API yolları için yetki kontrolü
  if (pathname.startsWith("/api")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin sayfası için role kontrolü
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const ticketPages = ["/my-tickets", "/tickets"];

  // adminler istedigi ticketa gidebilir
  if (user.role === "admin") {
    return NextResponse.next();
  }

  // Giris yapmamis kullanicilar tickets ve myticket sayfasina gitmesin
  if (ticketPages.some((path) => pathname.startsWith(path))) {
    if (!user) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin",
    "/auth/login",
    "/auth/register",
    "/my-tickets/:path*",
    "/tickets/:path*",
  ],
};
