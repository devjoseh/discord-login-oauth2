export function createAuthorizationURL() {
    const url = new URL("https://discord.com/oauth2/authorize");
    const scopes = [
        "identify",
        "connections",
        "guilds",
        "guilds.join",
        "email",
    ];

    const params: Record<string, string> = {
        client_id: process.env.CLIENT_ID!,
        redirect_uri: `${process.env.SERVER_BASE_URL}/api/discord/auth/callback`,
        response_type: "code",
        scope: scopes.join(" "),
    };

    url.search = new URLSearchParams(params).toString();
    return url.toString();
}

export function getPremiumTypeName(type?: number) {
    switch (type) {
        case 1:
            return "Nitro Classic";
        case 2:
            return "Nitro";
        case 3:
            return "Nitro Basic";
        default:
            return "None";
    }
}

export function hexToRgb(hex: number) {
    const r = (hex >> 16) & 255;
    const g = (hex >> 8) & 255;
    const b = hex & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

export function getAvatarUrl(
    userId: string,
    avatar: string,
    discriminator: string
) {
    if (avatar) {
        return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${
            avatar.startsWith("a_") ? "gif" : "png"
        }?size=256`;
    }
    return `https://cdn.discordapp.com/embed/avatars/${
        Number.parseInt(discriminator) % 5
    }.png`;
}

export function getBannerUrl(userId: string, banner?: string) {
    if (banner) {
        return `https://cdn.discordapp.com/banners/${userId}/${banner}.${
            banner.startsWith("a_") ? "gif" : "png"
        }?size=600`;
    }
    return null;
}

export function getClanBadgeUrl(guildId: string, badge: string) {
    return `https://cdn.discordapp.com/clan-badges/${guildId}/${badge}.png?size=64`;
}

export function maskToken(token: string) {
    return `${token.substring(0, 8)}${"*".repeat(20)}${token.substring(
        token.length - 8
    )}`;
}
