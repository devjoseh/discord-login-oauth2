"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Users, Zap, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    type Guild,
    getGuildIconUrl,
    getImportantFeatures,
    getGuildFeatureIcon,
    getGuildFeatureDisplayName,
    getUserRoleInGuild,
    getGuildBoostLevel,
} from "@/utils/functions/guilds";

interface GuildListItemProps {
    guild: Guild;
}

export function GuildListItem({ guild }: GuildListItemProps) {
    const iconUrl = getGuildIconUrl(guild.id, guild.icon);
    const importantFeatures = getImportantFeatures(guild.features);
    const userRole = getUserRoleInGuild(guild.permissions, guild.owner);
    const boostLevel = getGuildBoostLevel(guild.features);

    return (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                    {/* Server Icon */}
                    <Avatar className="w-16 h-16 border-2 border-background shadow-lg">
                        <AvatarImage
                            src={iconUrl || "/placeholder.svg"}
                            alt={guild.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-lg">
                            {guild.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {/* Server Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg truncate">
                                {guild.name}
                            </h3>
                            {guild.owner && (
                                <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                            <Badge
                                variant="outline"
                                className={`${userRole.color} border-current`}
                            >
                                {userRole.role}
                            </Badge>

                            {boostLevel.level > 0 && (
                                <Badge
                                    variant="outline"
                                    className={`${boostLevel.color} border-current`}
                                >
                                    <Zap className="w-3 h-3 mr-1" />
                                    Level {boostLevel.level}
                                </Badge>
                            )}

                            <Badge variant="secondary">
                                <Users className="w-3 h-3 mr-1" />
                                {guild.features.length} features
                            </Badge>
                        </div>

                        {/* Features */}
                        {importantFeatures.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {importantFeatures
                                    .slice(0, 5)
                                    .map((feature) => {
                                        const icon =
                                            getGuildFeatureIcon(feature);
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
                                {importantFeatures.length > 5 && (
                                    <div className="flex items-center bg-muted/50 rounded px-2 py-1">
                                        <span className="text-xs text-muted-foreground">
                                            +{importantFeatures.length - 5} more
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" asChild>
                            <a
                                href={`https://discord.com/channels/${guild.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>Open</span>
                            </a>
                        </Button>
                        <div className="text-xs text-muted-foreground text-center">
                            ID: {guild.id.slice(-6)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
