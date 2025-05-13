import { NextRequest, NextResponse } from "next/server";
import { getAuthUserFromRequest } from "./lib/auth/getAuthUser";

const publicAuthRoutes = ["/auth/login", "/auth/register"];
const publicApiRoutes = ["/api/auth"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = await getAuthUserFromRequest(req);

  // if user is logged in, can't access auth pages
  if (publicAuthRoutes.some((route) => pathname.startsWith(route))) {
    if (user) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Auth API routes are public
  if (publicApiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // API routes need JWT
  if (pathname.startsWith("/api")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Admin page role check
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*", // API routes
    "/auth/:path*", // auth pages
    "/admin", // admin page
    "/my-tickets", // user tickets page
    "/tickets/:path*", // tickets page
  ],
};
