declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    TOKEN: string;
    CLIENT_ID: string;
    STRAWPOLL_TOKEN: string;
    PUBLIC_KEY: string;
  }
}
