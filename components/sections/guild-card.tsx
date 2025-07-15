"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
    type Guild, 
    getGuildIconUrl, 
    getGuildBannerUrl, 
    getImportantFeatures, 
    getGuildFeatureIcon, 
    getGuildFeatureDisplayName, 
    getUserRoleInGuild, 
    getGuildBoostLevel 
} from "@/utils/functions/guilds";

interface GuildCardProps {
    guild: Guild;
}

export function GuildCard({ guild }: GuildCardProps) {
    const iconUrl = getGuildIconUrl(guild.id, guild.icon);
    const bannerUrl = getGuildBannerUrl(guild.id, guild.banner);
    const importantFeatures = getImportantFeatures(guild.features);
    const userRole = getUserRoleInGuild(guild.permissions, guild.owner);
    const boostLevel = getGuildBoostLevel(guild.features);

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden group">
            {/* Banner */}
            {bannerUrl ? (
                <div
                    className="h-24 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${bannerUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            ) : (
                <div className="h-24 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            <CardContent className="p-4 -mt-8 relative z-10">
                <div className="flex items-start space-x-3 mb-3">
                    <Avatar className="w-16 h-16 border-2 border-background shadow-lg">
                        <AvatarImage
                            src={iconUrl || "/placeholder.svg"}
                            alt={guild.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-lg">
                            {guild.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-sm truncate transition-colors">
                                {guild.name}
                            </h3>
                            {guild.owner && (
                                <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                            <Badge
                                variant="outline"
                                className={`text-xs ${userRole.color} border-current`}
                            >
                                {userRole.role}
                            </Badge>

                            {boostLevel.level > 0 && (
                                <Badge
                                    variant="outline"
                                    className={`text-xs ${boostLevel.color} border-current`}
                                >
                                    <Zap className="w-3 h-3 mr-1" />
                                    Level {boostLevel.level}
                                </Badge>
                            )}
                        </div>

                        {/* Important Features */}
                        {importantFeatures.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {importantFeatures
                                    .slice(0, 3)
                                    .map((feature) => {
                                        const icon = getGuildFeatureIcon(feature);
                                        return (
                                            <div
                                                key={feature}
                                                className="flex items-center space-x-1 bg-muted/50 rounded px-2 py-1"
                                                title={getGuildFeatureDisplayName(
                                                    feature
                                                )}
                                            >
                                                {icon}
                                                <span className="text-xs text-muted-foreground">
                                                    {getGuildFeatureDisplayName(
                                                        feature
                                                    )}
                                                </span>
                                            </div>
                                        );
                                    })}
                                {importantFeatures.length > 3 && (
                                    <div className="flex items-center bg-muted/50 rounded px-2 py-1">
                                        <span className="text-xs text-muted-foreground">
                                            +{importantFeatures.length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Server Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-muted/20">
                    <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{guild.features.length} recursos</span>
                    </div>
                    <div className="text-xs">ID: {guild.id}</div>
                </div>
            </CardContent>
        </Card>
    );
}
