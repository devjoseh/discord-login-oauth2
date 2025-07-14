import { createAuthorizationURL } from "@/utils/functions/discord"

export default async function LoginPage() {
    const url = createAuthorizationURL();

    return (
        <div>
            <h1>Login</h1>
            <p>Clique no botão abaixo para fazer login com o discord</p>
            <a href={url} target="_blank">
                <button>Login com Discord</button>
            </a>
        </div>
    )
}