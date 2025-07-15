"use client";

import { Button, Card, CardHeader, CardDescription, CardTitle, Avatar, AvatarFallback, AvatarImage, Badge, CardContent } from "@/components/index";
import { getConnectionIcon, getConnectionColor, getConnectionUrl, getConnectionDisplayName } from "@/utils/functions/connections";
import { getPremiumTypeName, hexToRgb, getAvatarUrl, getBannerUrl, getClanBadgeUrl, maskToken } from "@/utils/functions/discord";
import { ArrowRight, Copy, Crown, Eye, EyeOff, Globe, Mail, Shield, Star, Users, Verified } from "lucide-react";
import { GuildCard } from "../../components/sections/guild-card";
import { useState } from "react";
import Link from "next/link";

export function DashboardContent({
    user,
    profile,
    connections,
    guilds,
}: {
    user: any;
    profile: any;
    connections: any;
    guilds: any;
}) {
    const [showTokens, setShowTokens] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Profile Header with Banner */}
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden">
                        {/* Banner */}
                        {getBannerUrl(profile.id, profile.banner) && (
                            <div
                                className="h-32 bg-cover bg-center relative"
                                style={{
                                    backgroundImage: `url(${getBannerUrl(profile.id, profile.banner)})`,
                                    backgroundColor: profile.banner_color || (profile.accent_color ? hexToRgb(profile.accent_color) : "#5865F2"),
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        )}

                        <CardHeader
                            className={getBannerUrl(profile.id, profile.banner) ? "-mt-16 relative z-10" : ""}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
                                <div className="relative">
                                    <Avatar className="w-24 h-24 border-4 border-background">
                                        <AvatarImage
                                            src={getAvatarUrl(profile.id, profile.avatar, profile.discriminator) ||"/placeholder.svg"}
                                            alt={profile.username}
                                        />
                                        <AvatarFallback className="text-2xl">
                                            {(profile.global_name ||profile.username).charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {profile.clan && getClanBadgeUrl(profile.clan.identity_guild_id, profile.clan.badge) && (
                                        <div className="absolute -bottom-2 -right-2">
                                            <img
                                                src={getClanBadgeUrl(profile.clan.identity_guild_id, profile.clan.badge)! ||"/placeholder.svg"}
                                                alt={`Clan ${profile.clan.tag}`}
                                                className="w-8 h-8 rounded-full border-2 border-background"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h1 className="text-3xl font-bold">
                                            {profile.global_name ||
                                                profile.username}
                                        </h1>
                                        {profile.verified && (
                                            <Verified className="w-6 h-6 text-green-500" />
                                        )}
                                        {profile.premium_type &&
                                            profile.premium_type > 0 && (
                                                <Crown className="w-6 h-6 text-yellow-500" />
                                            )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <Badge variant="secondary">
                                            @{profile.username}
                                            {profile.discriminator !== "0" &&
                                                `#${profile.discriminator}`}
                                        </Badge>

                                        {profile.clan && (
                                            <Badge
                                                variant="outline"
                                                className="border-purple-500/50 text-purple-300"
                                            >
                                                {profile.clan.tag}
                                            </Badge>
                                        )}

                                        {profile.premium_type &&
                                            profile.premium_type > 0 && (
                                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                                                    <Crown className="w-3 h-3 mr-1" />
                                                    {getPremiumTypeName(
                                                        profile.premium_type
                                                    )}
                                                </Badge>
                                            )}
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <div className="flex items-center space-x-1">
                                            <Mail className="w-4 h-4" />
                                            <span>{profile.email}</span>
                                        </div>
                                        {profile.locale && (
                                            <div className="flex items-center space-x-1">
                                                <Globe className="w-4 h-4" />
                                                <span>{profile.locale}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Connections Section */}
                    {connections && connections.length > 0 && (
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Globe className="w-5 h-5" />
                                    <span>Conexões</span>
                                    <Badge variant="secondary">{connections.length}</Badge>
                                </CardTitle>
                                <CardDescription>As suas contas de redes sociais e plataformas conectadas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {connections.map((connection:any) => (
                                        
                                        <a
                                            key={connection.id}
                                            href={getConnectionUrl(connection)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            // className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 transform hover:scale-105`}
                                            className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${getConnectionColor(connection.type)}`}
                                        >
                                        <div className="flex-shrink-0">{getConnectionIcon(connection.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{connection.name}</p>
                                            <p className="text-sm opacity-80">{getConnectionDisplayName(connection.type)}</p>
                                        </div>
                                        {connection.verified && <Verified className="w-4 h-4 flex-shrink-0" />}
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Servers Section */}
                    {guilds && guilds.length > 0 && (
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5" />
                                        <span>Servidores</span>
                                        <Badge variant="secondary">{guilds.length}</Badge>
                                    </div>
                                    <Button asChild variant="default" size="sm">
                                        <Link href="/dashboard/servers">
                                            Ver todos os servidores
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                                <CardDescription>Servidores que o usuário é membro</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {guilds.slice(0, 6).map((guild:any) => (
                                        <GuildCard key={guild.id} guild={guild} />
                                    ))}
                                </div>
                                {guilds.length > 6 && (
                                    <div className="mt-4 text-center">
                                        <Button asChild variant="default">
                                            <Link href="/dashboard/servers">Ver todos os {guilds.length} servidores</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Account Details */}
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle>Dados da Conta</CardTitle>
                                <CardDescription>
                                    Informações da sua conta do Discord
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            ID de Usuário
                                        </label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1 font-mono">
                                                {profile.id}
                                            </code>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    copyToClipboard(profile.id)
                                                }
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Nome de Exibição
                                        </label>
                                        <div className="mt-1">
                                            <code className="bg-muted px-2 py-1 rounded text-sm">
                                                {profile.global_name || profile.username}
                                            </code>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Nome de Esuário
                                        </label>
                                        <div className="mt-1">
                                            <code className="bg-muted px-2 py-1 rounded text-sm">
                                                @{profile.username}
                                                {profile.discriminator !== "0" && `#${profile.discriminator}`}
                                            </code>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Email
                                        </label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                                                {profile.email}
                                            </code>
                                            {profile.verified && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-green-600"
                                                >
                                                    <Verified className="w-3 h-3 mr-1" />
                                                    Verificado
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Premium & Security */}
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle>Nitro & Segurança</CardTitle>
                                <CardDescription>
                                    Status da conta e informações de segurança.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Status de Nitro
                                        </label>
                                        <div className="mt-1">
                                            <Badge
                                                className={
                                                    profile.premium_type &&
                                                    profile.premium_type > 0
                                                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                                        : "bg-muted text-muted-foreground"
                                                }
                                            >
                                                {profile.premium_type &&
                                                    profile.premium_type >
                                                        0 && (
                                                        <Crown className="w-3 h-3 mr-1" />
                                                    )}
                                                {getPremiumTypeName(profile.premium_type)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Autenticação de Dois Fatores
                                        </label>
                                        <div className="mt-1">
                                            <Badge
                                                variant={profile.mfa_enabled ? "default" : "destructive"}
                                            >
                                                <Shield className="w-3 h-3 mr-1" />
                                                {profile.mfa_enabled ? "Ativado" : "Desativado"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Local
                                        </label>
                                        <div className="mt-1">
                                            <Badge variant="secondary">
                                                <Globe className="w-3 h-3 mr-1" />
                                                {profile.locale || "Not set"}
                                            </Badge>
                                        </div>
                                    </div>

                                    {profile.accent_color && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Cor de destaque
                                            </label>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <div
                                                    className="w-6 h-6 rounded border border-muted"
                                                    style={{
                                                        backgroundColor: hexToRgb(profile.accent_color),
                                                    }}
                                                />
                                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                                    {hexToRgb(
                                                        profile.accent_color
                                                    )}
                                                </code>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Clan Information */}
                    {profile.clan && (
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle>Informações sobre o clã</CardTitle>
                                <CardDescription>
                                    Detalhes do seu clã no Discord
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    {getClanBadgeUrl(profile.clan.identity_guild_id, profile.clan.badge) && (
                                        <img
                                            src={getClanBadgeUrl(profile.clan.identity_guild_id, profile.clan.badge)! ||"/placeholder.svg"}
                                            alt={`Clan ${profile.clan.tag}`}
                                            className="w-16 h-16 rounded-full border-2 border-primary/20"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            { profile.clan.tag }
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            ID do Servidor:{" "}
                                            { profile.clan.identity_guild_id }
                                        </p>
                                        <Badge
                                            variant={ profile.clan.identity_enabled ? "default" : "secondary" }
                                            className="mt-2"
                                        >
                                            { profile.clan.identity_enabled ? "Ativado" : "Desativado" }
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Collectibles */}
                    {profile.collectibles?.nameplate && (
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle>Collectibles</CardTitle>
                                <CardDescription>
                                    Your Discord collectible items
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <Star className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            Nameplate
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            SKU:{" "}
                                            { profile.collectibles.nameplate.sku_id }
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-2 border-purple-500/50 text-purple-300"
                                        >
                                            { profile.collectibles.nameplate.palette }
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* OAuth2 Tokens */}
                    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>OAuth2 Tokens</CardTitle>
                                    <CardDescription>
                                        Seu identificador interno e 
                                        access token
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowTokens(!showTokens)}
                                >
                                    {showTokens ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                    {showTokens ? "Esconder" : "Mostrar"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Identificador interno
                                </label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <code className="bg-muted px-2 py-1 rounded text-sm flex-1 font-mono">
                                        {showTokens ? user._id : maskToken(user._id)}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(user._id)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Access Token
                                </label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <code className="bg-muted px-2 py-1 rounded text-sm flex-1 font-mono">
                                        {showTokens ? user.access_token : maskToken(user.access_token)}
                                    </code>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(user.access_token)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}
