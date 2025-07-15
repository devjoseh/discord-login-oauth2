import { getUserGuilds } from "@/utils/actions/discord/user/guilds";
import { ServersContent } from "./servers-content";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Guild } from "@/utils/functions/guilds";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    let guilds = await getUserGuilds(user);
    if (!guilds.success) {
        redirect("/login");
    }

    guilds = guilds.data;

    return (
         <ServersContent guilds={guilds as Guild[]} />
    );
}
