import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface JwtPayload {
    userId: string;
    discordId: string;
}

export async function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("sessionToken")?.value;
    const loginUrl = new URL("/login", request.url);

    if (!sessionToken) {
        return NextResponse.redirect(loginUrl);
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        await jwtVerify<JwtPayload>(sessionToken, secret);

        return NextResponse.next();
    } catch (error) {
        console.error("Invalid token:", error);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("sessionToken");
        return response;
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile"],
};