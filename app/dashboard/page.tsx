import { getUserConnections } from "@/utils/actions/discord/user/connections";
import { getUserProfile } from "@/utils/actions/discord/user/profile";
import { getUserGuilds } from "@/utils/actions/discord/user/guilds";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const profile = await getUserProfile(user);
    if(!profile.success) {
        redirect("/login");
    }

    const connections = await getUserConnections(user);
    if(!connections.success) {
        redirect("/login");
    }

    const guilds = await getUserGuilds(user);
    if(!guilds.success) {
        redirect("/login");
    }

    return (
        <div>
            <p style={{ color: "gray" }}>
                Seu ID interno: {user._id}
            </p>
            <pre>
                <code>Informações do Perfil {JSON.stringify(profile.data, null, 2)}</code>
            </pre>
            <pre>
                <code>Conexões do Usuário {JSON.stringify(connections.data, null, 2)}</code>
            </pre>
            <pre>
                <code>Servidores do Usuário {JSON.stringify(guilds.data, null, 2)}</code>
            </pre>
        </div>
    );
}
