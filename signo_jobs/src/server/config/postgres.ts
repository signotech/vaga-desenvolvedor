import { Sequelize } from "sequelize-typescript";

export const postgresSequelize = new Sequelize({
  username: process.env.NEXT_PUBLIC_DB_USERNAME,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_DB_PORT as string),
  dialect: "postgres",
});
