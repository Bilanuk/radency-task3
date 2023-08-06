import pool from "./instances/pgInstance";
import dotenv from "dotenv";
dotenv.config();

pool.query(
  `CREATE DATABASE "${process.env.DATABASE_NAME}"`,
  (error, results) => {
    if (error) {
      console.error("Error creating database:", error);
    }
    console.log("Database created");
  }
);

pool.end();
