/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_DISCORD_CLIENT_ID: string;
  readonly VITE_DISCORD_CLIENT_SCOPES: string;
  readonly VITE_DISCORD_CLIENT_REDIRECT_URI: string;
  readonly VITE_DISCORD_CLIENT_AUTHORIZATION_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
