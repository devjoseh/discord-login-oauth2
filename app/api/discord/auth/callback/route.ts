import { handleDiscordCallback } from "@/utils/actions/discord/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    const result = await handleDiscordCallback(code);

    if (result.success && result.sessionToken) {
        const response = NextResponse.redirect(new URL('/dashboard', request.url));

        response.cookies.set("sessionToken", result.sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 7 dias
            sameSite: "lax",
            path: "/",
        });

        return response;
    } else {
        return NextResponse.redirect(new URL(`/login?error=${result.error || 'ServerError'}`, request.url));
    }
}