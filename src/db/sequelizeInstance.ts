import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();
import { Note } from "../models/note";

export let sequelizeInstance = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [Note],
});
