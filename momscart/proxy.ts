import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);

    if (!searchParams.has("callbackUrl")) {
      loginUrl.searchParams.set("callbackUrl", pathname);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
