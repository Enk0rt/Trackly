import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
    PORT: string;

    MONGO_DB_URI: string;
    MONGO_DB_USER: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_NAME: string;
}

export const config: IConfig = {
    PORT: process.env.PORT,

    MONGO_DB_URI: process.env.MONGO_DB_URI,
    MONGO_DB_USER: process.env.MONGO_DB_USER,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};
