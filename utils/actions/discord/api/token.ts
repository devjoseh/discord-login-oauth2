type RESTPostOAuth2AccessTokenResult = {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token: string;
    scope: string;
}

type FetchResult<T> = 
| {
    success: true,
    data: T
}
| {
    success: false;
    error: string;
    status: number;
}

type TokenExchangeResult = FetchResult<RESTPostOAuth2AccessTokenResult>;

export async function userAccessToken(code: string): Promise<TokenExchangeResult>
export async function userAccessToken(refreshToken: string, refresh: true): Promise<TokenExchangeResult>
export async function userAccessToken(argA: string, refresh: boolean = false): Promise<TokenExchangeResult> {
    const clientInfo = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }

    const fetchBody = refresh ? {
        grant_type: "refresh_token", refresh_token: argA
    } : {
        code: argA,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.SERVER_BASE_URL}/auth/redirect`
    }

    const body: {} = Object.assign(clientInfo, fetchBody)

    const response = await fetch(`${process.env.ROUTE_BASE_API}/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(body).toString()
    });

    const data = await response.json() as RESTPostOAuth2AccessTokenResult;
    if(!response.ok) {
        return { success: false, status: response.status, error: response.statusText }
    }

    return { success: true, data }
}