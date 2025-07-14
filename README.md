# Exemplo de Login Discord OAuth2

Este projeto demonstra uma aplicação usando Next.js para autenticação Discord OAuth2, permitindo que os usuários façam login com sua conta Discord e acessem um painel protegido.

## Funcionalidades

*   **Integração Discord OAuth2:** Autentica usuários de forma segura via Discord.
*   **Rotas Protegidas:** Restringe o acesso a pagina de dashboard apenas para usuários autenticados.
*   **Gerenciamento de Sessão de Usuário:** Mantém as sessões do usuário após o login bem-sucedido.
*   **Integração MongoDB:** Registro de token JWT e dados de tokens de acesso do usuário.

## Tecnologias Utilizadas

*   **Next.js:** Framework React para construir aplicações web full-stack.
*   **React:** Biblioteca JavaScript para construir interfaces de usuário.
*   **Tailwind CSS:** Um framework CSS utility-first para desenvolvimento rápido de UI.
*   **MongoDB:** Banco de dados NoSQL para armazenamento de dados.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

*   **Node.js** (versão LTS recomendada)
*   **npm** ou **Yarn**

## Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/devjoseh/discord-login-oauth2.git
    cd discord-login-oauth2
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

## Configuração

Este projeto requer várias variáveis de ambiente para o Discord OAuth2 e conexão com o banco de dados.

1.  **Crie um arquivo `.env.local`:**
    Copie o conteúdo de `.env.example` para um novo arquivo chamado `.env.local` na raiz do seu projeto.

    ```bash
    cp .env.example .env.local
    ```

2.  **Obtenha as Credenciais do Discord OAuth2:**
    *   Vá para o [Portal do Desenvolvedor Discord](https://discord.com/developers/applications).
    *   Faça login com sua conta Discord.
    *   Clique em "New Application" para criar uma nova aplicação.
    *   Dê um nome à sua aplicação.
    *   Navegue até a seção "OAuth2" -> "General".
    *   Copie seu **Client ID** e **Client Secret**.
    *   Em "Redirects", adicione a seguinte URL (substitua `YOUR_DOMAIN` pelo domínio da sua aplicação, ex: `http://localhost:3000` para desenvolvimento local):
        `YOUR_DOMAIN/api/auth/callback/discord`
        Para desenvolvimento local, isso geralmente será `http://localhost:3000/api/auth/callback/discord`.
    *   Salve as alterações.

3.  **Defina as Variáveis de Ambiente:**
    Abra seu arquivo `.env.local` e preencha as seguintes variáveis:

    ```env
    CLIENT_ID=SEU_DISCORD_CLIENT_ID
    CLIENT_SECRET=SEU_DISCORD_CLIENT_SECRET
    ROUTE_BASE_API="https://discord.com/api/v10"

    # Gere uma string aleatória forte
    JWT_SECRET=CODIGO_JWT_SECRETO

    SERVER_BASE_URL=http://localhost:3000

    MONGODB_URI=SUA_STRING_DE_CONEXAO_MONGODB
    ```

## Executando a Aplicação

### Modo de Desenvolvimento

Para executar a aplicação em modo de desenvolvimento com hot-reloading:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará acessível em `http://localhost:3000`.

### Build e Produção

Para construir a aplicação para produção e executá-la:

1.  **Construa o projeto:**

    ```bash
    npm run build
    # ou
    yarn build
    ```

2.  **Inicie o servidor de produção:**

    ```bash
    npm run start
    # ou
    yarn start
    ```

A aplicação estará tipicamente acessível em `http://localhost:3000` (ou a porta configurada no seu ambiente).

## Contribuindo

Sinta-se à vontade para fazer um fork do repositório, criar uma nova branch e enviar pull requests.