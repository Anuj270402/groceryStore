import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* -------------------- PUBLIC ROUTES -------------------- */
  const publicRoutes = [
    "/login",
    "/register",
    "/unauthorized",
  ];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  /* -------------------- AUTH CHECK -------------------- */
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* -------------------- ROLE BASED ACCESS -------------------- */
  const role = token.role as "user" | "admin" | "deliveryBoy";

  // USER ROUTES
  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ADMIN ROUTES
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // DELIVERY ROUTES
  if (pathname.startsWith("/delivery") && role !== "deliveryBoy") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

/* -------------------- MATCHER -------------------- */
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
