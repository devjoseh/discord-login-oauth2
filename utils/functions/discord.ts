export function createAuthorizationURL() {
    const url = new URL("https://discord.com/oauth2/authorize");
    const scopes = [ 
        "identify",
        "connections",
        "guilds",
        "guilds.join",
        "email"
    ];

    const params: Record<string, string> = {
        client_id: process.env.CLIENT_ID!,
        redirect_uri: `${process.env.SERVER_BASE_URL}/api/discord/auth/callback`,
        response_type: "code",
        scope: scopes.join(" ")
    }

    url.search = new URLSearchParams(params).toString();
    return url.toString();
}