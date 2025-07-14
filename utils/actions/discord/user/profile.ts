"use server";

import { getCurrentUser } from "@/lib/session";
import { fetchUserInfo } from "../api/info";
import User from "@/utils/models/User";

export async function getUserProfile({ access_token, _id }: { access_token: string, _id: string }): Promise<any> {
    let result = await fetchUserInfo(access_token)
    if(!result.success) {
        const token = await getCurrentUser(true)
        if (token) {
           result = await fetchUserInfo(token.access_token);
        }
    }

    if(!result.success) {
        await User.findByIdAndDelete(_id);
        return { success: false, error: "Disconnected" };
    }

    return { success: true, data: result.data };
}