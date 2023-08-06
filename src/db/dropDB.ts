import pool from "./instances/pgInstance";
import dotenv from "dotenv";
dotenv.config();

pool.query(
  `DROP DATABASE IF EXISTS "${process.env.DATABASE_NAME}"`,
  (error) => {
    if (error) {
      console.error("Error dropping database:", error);
    }
    console.log("Database dropped");
  }
);

pool.end();
