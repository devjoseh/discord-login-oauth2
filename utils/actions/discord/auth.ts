import User from "@/utils/models/User";
import connectDB from "@/lib/mongodb";
import { SignJWT } from "jose";
import { logError } from "@/utils/functions/logError";

interface CallbackResult {
    success: boolean;
    sessionToken?: string;
    error?: 'NoCode' | 'TokenError' | 'UserNotFound' | 'ServerError';
}

export async function handleDiscordCallback(code: string | null): Promise<CallbackResult> {
    if (!code) {
        return { success: false, error: 'NoCode' };
    }

    try {
        const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID!,
                client_secret: process.env.CLIENT_SECRET!,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SERVER_BASE_URL + '/api/discord/auth/callback',
            }),
        });

        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
            await logError('Discord Token Error', tokenData);
            return { success: false, error: 'TokenError' };
        }

        const { access_token, refresh_token, expires_in } = tokenData;

        const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        });

        const userData = await userResponse.json();
        const { id: discordId, username } = userData;

        await connectDB();
        const user = await User.findOneAndUpdate(
            { discordId: discordId },
            {
                username,
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresAt: Date.now() + expires_in * 1000,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).lean();

        if (!user) {
            return { success: false, error: 'UserNotFound' };
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const sessionToken = await new SignJWT({
                userId: user._id.toString(),
                discordId: user.discordId
            })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret);

        return { success: true, sessionToken: sessionToken };
    } catch (error) {
        await logError('Callback Error', error);
        return { success: false, error: 'ServerError' };
    }
}