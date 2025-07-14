"use server";

import { fetchUserConnections } from "../api/connections";
import { getCurrentUser } from "@/lib/session";
import User from "@/utils/models/User";

export async function getUserConnections({ access_token, _id }: { access_token: string, _id: string }): Promise<any> {
    let result = await fetchUserConnections(access_token)
    if(!result.success) {
        const token = await getCurrentUser(true)
        if (token) {
           result = await fetchUserConnections(token.access_token);
        }
    }

    if(!result.success) {
        await User.findByIdAndDelete(_id);
        return { success: false, error: "Disconnected" };
    }

    return { success: true, data: result.data };
}