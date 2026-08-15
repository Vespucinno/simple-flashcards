// proxy.ts (gak kepake ini gimana we)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // 1. Retrieve the session cookie
  const sessionToken = request.cookies.get("session-token")?.value;

  // 2. Define your protected route condition
  if (request.nextUrl.pathname.startsWith("/")) {
    if (!sessionToken) {
      // 3. Redirect unauthenticated users to the sign-in page
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 4. Configure matcher to optimize execution paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
