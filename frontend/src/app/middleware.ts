import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/sign-in", "/sign-up"];
const PROTECTED_PAGES = ["/dashboard", "/profile"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = AUTH_PAGES.some((page) =>
    request.nextUrl.pathname.startsWith(page),
  );
  const isProtectedPage = PROTECTED_PAGES.some((page) =>
    request.nextUrl.pathname.startsWith(page),
  );

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
