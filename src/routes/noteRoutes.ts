import express from "express";
import { NoteController } from "../controllers/noteController";

const noteRouter = express.Router();
const noteController = new NoteController();

export default function noteRoutes() {
  noteRouter.get("/stats", noteController.getStats.bind(noteController));
  noteRouter.post("/", noteController.createNote.bind(noteController));
  noteRouter.delete("/:id", noteController.deleteNote.bind(noteController));
  noteRouter.patch("/:id", noteController.updateNote.bind(noteController));
  noteRouter.get("/", noteController.getAllNotes.bind(noteController));
  noteRouter.get("/:id", noteController.getNoteById.bind(noteController));

  return noteRouter;
}
