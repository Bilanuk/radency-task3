import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
});

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
