import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Media } from "src/entities/media/media.model";
import { config } from "./configObj";

export const dbOptions: SequelizeModuleOptions = {
    dialect: "mysql",
    host: config.dbHost,
    username: config.dbUser,
    password: config.dbPassword,
    port: parseInt(config.dbPort),
    database: config.dbName,
    models: [Media]
}