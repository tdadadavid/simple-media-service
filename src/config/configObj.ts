import * as dotenv from "dotenv";

dotenv.config()

export const config = Object.freeze({
    dbURL: process.env.DATABASE_URL,
    dbHost: process.env.DATABASE_HOST,
    dbUser: process.env.DATABASE_USER,
    dbName: process.env.DATABASE_NAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbPort: process.env.DATABASE_PORT
});