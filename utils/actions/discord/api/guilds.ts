export async function fetchUserGuilds(accessToken: string) {
    const response = await fetch(`${process.env.ROUTE_BASE_API}/users/@me/guilds`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })

    if(!response.ok) {
        return { success: false, status: response.status, error: response.statusText }
    }

    const data = await response.json();
    return { success: true, data }
    
}