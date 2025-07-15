import { getUserConnections } from "@/utils/actions/discord/user/connections";
import { getUserProfile } from "@/utils/actions/discord/user/profile";
import { getUserGuilds } from "@/utils/actions/discord/user/guilds";
import { Shield, ArrowLeft, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { DashboardContent } from "./content";
import { Button } from "@/components/index";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    let profile = await getUserProfile(user);
    if (!profile.success) {
        redirect("/login");
    }

    let connections = await getUserConnections(user);
    if (!connections.success) {
        redirect("/login");
    }

    let guilds = await getUserGuilds(user);
    if (!guilds.success) {
        redirect("/login");
    }

    profile = profile.data;
    connections = connections.data;
    guilds = guilds.data;

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="ghost">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Início
                            </Link>
                        </Button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </div>
                    </div>

                    <form>
                        <Button variant="destructive" type="submit">
                            <LogOut className="w-4 h-4 mr-2" />
                            Desconectar
                        </Button>
                    </form>
                </nav>
            </header>

            {/* Main Content */}
            <DashboardContent user={user} profile={profile} connections={connections} guilds={guilds} />
        </div>
    );
}
