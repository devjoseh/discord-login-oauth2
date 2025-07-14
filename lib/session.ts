import { userAccessToken } from '@/utils/actions/discord/api/token';
import User from '@/utils/models/User';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import { jwtVerify } from 'jose';

interface JwtPayload {
    userId: string;
}

export async function getCurrentUser(forceRefresh?: boolean): Promise<({ access_token: string, _id: string }) | null> {
    const sessionToken = (await cookies()).get('sessionToken')?.value;
    if (!sessionToken) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify<JwtPayload>(sessionToken, secret);

        if (!payload.userId) return null;
        
        await connectDB();
        
        const user = await User.findById(payload.userId)
            .select('accessToken refreshToken')
            .lean();

        if (!user) return null;

        if(forceRefresh) {
            const result = await userAccessToken(user.refreshToken, true);
            if (!result.success) return null;

            await User.findOneAndUpdate(
                { _id: user._id },
                {
                    $set: {
                        accessToken: result.data.access_token,
                        refreshToken: result.data.refresh_token,
                        expiresAt: Date.now() + result.data.expires_in * 1000,
                    }
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).lean();

            return { access_token: result.data.access_token ?? null, _id: user._id.toString() }
        }

        return { access_token: user.accessToken ?? null, _id: user._id.toString() };
    } catch (_error) {
        return null;
    }
}