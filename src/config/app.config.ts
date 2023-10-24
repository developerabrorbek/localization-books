declare interface AppConfigOptions {
  host: string;
  port: number;
}

export const appConfig: AppConfigOptions = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3002
}





