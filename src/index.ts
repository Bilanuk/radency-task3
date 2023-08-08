import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import sequelizeInstance from './db/instances/sequelizeInstance';

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

async function connectToDatabase() {
  try {
    await sequelizeInstance.authenticate();
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function initializeApp() {
  await connectToDatabase();
  await startServer();
}

initializeApp();
