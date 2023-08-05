import express from "express";
import bodyParser from "body-parser";
import { initializeDatabase } from "./database";
import routes from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  app.use(routes());

  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
  });
}

async function initializeApp() {
  await initializeDatabase();
  await startServer();
}

initializeApp();
