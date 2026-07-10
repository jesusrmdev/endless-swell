/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_WIDTH: string;
  readonly VITE_GAME_HEIGHT: string;
  readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}
