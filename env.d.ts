declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      sslmode: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_SECRET: string;
      JWT_ACCESS_TOKEN_EXPIRES_IN: string;
      JWT_REFRESH_TOKEN_EXPIRES_IN: string;
      CSRF_TOKEN_SECRET: string;
      CSRF_TOKEN_EXPIRES_IN: string;
      NODE_ENV: string;
    }
  }
}

export {};
