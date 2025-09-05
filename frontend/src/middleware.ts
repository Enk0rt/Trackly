import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("from", req.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

// middleware запускається ТІЛЬКИ на приватних секціях
export const config = {
    matcher: ["/app/:path*", "/dashboard/:path*", "/profile/:path*", "/habits/:path*","/goals/:path*","/planner/:path*"],
};