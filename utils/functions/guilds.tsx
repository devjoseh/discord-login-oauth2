import {
    Crown,
    Shield,
    Users,
    Zap,
    Star,
    Settings,
    Hash,
    Volume2,
} from "lucide-react";

export interface Guild {
    id: string;
    name: string;
    icon: string | null;
    banner: string | null;
    owner: boolean;
    permissions: string;
    features: string[];
}

export function getGuildIconUrl(guildId: string, icon: string | null) {
    if (!icon) return null;
    return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${icon.startsWith("a_") ? "gif" : "png"}?size=256`;
}

export function getGuildBannerUrl(guildId: string, banner: string | null) {
    if (!banner) return null;
    return `https://cdn.discordapp.com/banners/${guildId}/${banner}.${banner.startsWith("a_") ? "gif" : "png"}?size=600`;
}

export function getGuildFeatureIcon(feature: string) {
    switch (feature) {
        case "VERIFIED":
            return <Shield className="w-4 h-4 text-green-500" />;
        case "PARTNERED":
            return <Crown className="w-4 h-4 text-purple-500" />;
        case "COMMUNITY":
            return <Users className="w-4 h-4 text-blue-500" />;
        case "DISCOVERABLE":
            return <Star className="w-4 h-4 text-yellow-500" />;
        case "VANITY_URL":
            return <Hash className="w-4 h-4 text-indigo-500" />;
        case "ANIMATED_ICON":
        case "ANIMATED_BANNER":
            return <Zap className="w-4 h-4 text-orange-500" />;
        case "BANNER":
            return <Settings className="w-4 h-4 text-gray-500" />;
        case "INVITE_SPLASH":
            return <Star className="w-4 h-4 text-pink-500" />;
        case "VIP_REGIONS":
            return <Crown className="w-4 h-4 text-gold-500" />;
        case "AUDIO_BITRATE_384_KBPS":
        case "AUDIO_BITRATE_256_KBPS":
            return <Volume2 className="w-4 h-4 text-green-600" />;
        default:
            return null;
    }
}

export function getGuildFeatureDisplayName(feature: string) {
    const featureNames: Record<string, string> = {
        VERIFIED: "Verified",
        PARTNERED: "Partnered",
        COMMUNITY: "Community",
        DISCOVERABLE: "Discoverable",
        VANITY_URL: "Custom URL",
        ANIMATED_ICON: "Animated Icon",
        ANIMATED_BANNER: "Animated Banner",
        BANNER: "Banner",
        INVITE_SPLASH: "Invite Splash",
        VIP_REGIONS: "VIP Regions",
        AUDIO_BITRATE_384_KBPS: "384kbps Audio",
        AUDIO_BITRATE_256_KBPS: "256kbps Audio",
        AUDIO_BITRATE_128_KBPS: "128kbps Audio",
        VIDEO_QUALITY_1080_60FPS: "1080p 60fps",
        VIDEO_QUALITY_720_60FPS: "720p 60fps",
        THREADS_ENABLED: "Threads",
        NEWS: "News Channels",
        WELCOME_SCREEN_ENABLED: "Welcome Screen",
        MEMBER_VERIFICATION_GATE_ENABLED: "Member Verification",
        PREVIEW_ENABLED: "Server Preview",
        ROLE_ICONS: "Role Icons",
        ENHANCED_ROLE_COLORS: "Enhanced Role Colors",
        SOUNDBOARD: "Soundboard",
        AUTO_MODERATION: "Auto Moderation",
        GUILD_ONBOARDING: "Server Onboarding",
        TIERLESS_BOOSTING: "Server Boosting",
        MAX_FILE_SIZE_50_MB: "50MB File Upload",
        MAX_FILE_SIZE_100_MB: "100MB File Upload",
        STAGE_CHANNEL_VIEWERS_300: "300 Stage Viewers",
        STAGE_CHANNEL_VIEWERS_150: "150 Stage Viewers",
        STAGE_CHANNEL_VIEWERS_50: "50 Stage Viewers",
        TEXT_IN_VOICE_ENABLED: "Text in Voice",
        CREATOR_MONETIZABLE: "Monetizable",
        DEVELOPER_SUPPORT_SERVER: "Developer Support",
        GUILD_WEB_PAGE_VANITY_URL: "Web Page URL",
    };

    return featureNames[feature] || feature.replace(/_/g, " ").toLowerCase();
}

export function getImportantFeatures(features: string[]) {
    const importantFeatures = [
        "VERIFIED",
        "PARTNERED",
        "COMMUNITY",
        "DISCOVERABLE",
        "VANITY_URL",
        "ANIMATED_ICON",
        "ANIMATED_BANNER",
        "VIP_REGIONS",
        "AUDIO_BITRATE_384_KBPS",
        "VIDEO_QUALITY_1080_60FPS",
        "CREATOR_MONETIZABLE",
        "DEVELOPER_SUPPORT_SERVER",
    ];

    return features.filter((feature) => importantFeatures.includes(feature));
}

export function hasPermission(permissions: string, permission: bigint) {
    const userPermissions = BigInt(permissions);
    return (userPermissions & permission) === permission;
}

export function getUserRoleInGuild(permissions: string, isOwner: boolean) {
    if (isOwner) return { role: "Owner", color: "text-yellow-500" };

    const perms = BigInt(permissions);
    const ADMINISTRATOR = BigInt(0x8);
    const MANAGE_GUILD = BigInt(0x20);
    const MANAGE_CHANNELS = BigInt(0x10);
    const MANAGE_ROLES = BigInt(0x10000000);

    if ((perms & ADMINISTRATOR) === ADMINISTRATOR) {
        return { role: "Administrator", color: "text-red-500" };
    }
    if ((perms & MANAGE_GUILD) === MANAGE_GUILD) {
        return { role: "Manager", color: "text-orange-500" };
    }
    if (
        (perms & MANAGE_CHANNELS) === MANAGE_CHANNELS ||
        (perms & MANAGE_ROLES) === MANAGE_ROLES
    ) {
        return { role: "Moderator", color: "text-blue-500" };
    }

    return { role: "Member", color: "text-gray-400" };
}

export function getGuildBoostLevel(features: string[]) {
    if (
        features.includes("AUDIO_BITRATE_384_KBPS") &&
        features.includes("MAX_FILE_SIZE_100_MB")
    ) {
        return { level: 3, color: "text-pink-500" };
    }
    if (
        features.includes("AUDIO_BITRATE_256_KBPS") &&
        features.includes("MAX_FILE_SIZE_50_MB")
    ) {
        return { level: 2, color: "text-purple-500" };
    }
    if (features.includes("AUDIO_BITRATE_128_KBPS")) {
        return { level: 1, color: "text-blue-500" };
    }
    return { level: 0, color: "text-gray-400" };
}
