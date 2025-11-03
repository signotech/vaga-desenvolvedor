import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const DASHBOARD_MATCHERS = [
  { prefix: "/company", login: "/login-company", role: "COMPANY" },
  { prefix: "/candidate", login: "/login-candidate", role: "CANDIDATE" },
  { prefix: "/admin", login: "/login-company", role: "ADMIN" },
];

function resolveLoginRedirect(pathname) {
  const match = DASHBOARD_MATCHERS.find(({ prefix }) =>
    pathname.startsWith(prefix)
  );

  return match?.login ?? "/login-company";
}

function resolveDashboardRedirect(role) {
  const entry = DASHBOARD_MATCHERS.find(
    ({ role: entryRole }) => entryRole === role
  );

  return entry?.prefix;
}

async function validateToken(token, request, pathname, match) {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const role = typeof payload.role === "string" ? payload.role : undefined;

    if (match?.role && (!role || role !== match.role)) {
      const dashboardRedirect = resolveDashboardRedirect(role);
      const fallbackRedirect = resolveLoginRedirect(pathname);
      const redirectUrl = dashboardRedirect ?? fallbackRedirect;

      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(
      new URL(resolveLoginRedirect(pathname), request.url)
    );
    response.cookies.delete("authToken");
    return response;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const match = DASHBOARD_MATCHERS.find(({ prefix }) =>
    pathname.startsWith(prefix)
  );

  if (!match) {
    return NextResponse.next();
  }

  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    const redirectUrl = new URL(resolveLoginRedirect(pathname), request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return validateToken(token, request, pathname, match);
}

export const config = {
  matcher: ["/company/:path*", "/candidate/:path*", "/admin/:path*"],
};
