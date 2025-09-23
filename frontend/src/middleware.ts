import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const { pathname } = req.nextUrl;

    const publicPaths = ["/", "/sign-in", "/sign-up"];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    if (!refreshToken) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:username/:path*",
        "/habits/:path*",
        "/goals/:path*",
        "/planner/:path*",
    ],
};