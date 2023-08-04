import express from "express";
import bodyParser from "body-parser";
import { NoteController } from "./controllers/noteController";
import { NoteRepository } from "./repositories/noteRepository";
import { Note } from "./models/note";
import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { createDatabaseIfNotExists, setupDatabase } from "./database";
import { setupNoteRoutes } from './routes/noteRoutes';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  const noteRepository = new NoteRepository();
  const noteController = new NoteController(noteRepository);

  app.use("/notes", setupNoteRoutes(noteController));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

async function initializeApp() {
    const sequelize = new Sequelize({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });

    await createDatabaseIfNotExists(sequelize);
    sequelize.addModels([Note]);
    await setupDatabase(sequelize);
    await startServer();
}

initializeApp();
