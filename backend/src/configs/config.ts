import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
    NODE_ENV: string;
    PORT: string;
    MONGO_DB_URI: string;
    MONGO_DB_USER: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_NAME: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_LIFETIME: any;
    JWT_VERIFY_SECRET: string;
    JWT_VERIFY_LIFETIME: any;
    JWT_RECOVERY_SECRET: string;
    JWT_RECOVERY_LIFETIME: any;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    FRONTEND_URL: string;
}

export const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    MONGO_DB_URI: process.env.MONGO_DB_URI,
    MONGO_DB_USER: process.env.MONGO_DB_USER,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_SECRET: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,
    JWT_VERIFY_SECRET: process.env.JWT_VERIFY_SECRET,
    JWT_VERIFY_LIFETIME: process.env.JWT_VERIFY_LIFETIME,
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET,
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME,

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    FRONTEND_URL: process.env.FRONTEND_URL,
};
