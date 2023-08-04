import { Request, Response, Router } from "express";
import { NoteRepository } from "../repositories/noteRepository";
import { Note } from "../models/note";
import { NoteCategory } from "../models/note";
import * as yup from "yup";

const noteSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().oneOf(Object.values(NoteCategory)).required(),
  date: yup.string().required(),
  content: yup.string().required(),
  isArchived: yup.boolean().required(),
});

export class NoteController {
  private noteRepository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async getAllNotes(req: Request, res: Response) {
    try {
      const notes = await this.noteRepository.getAllNotes();
      res.json(notes);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving notes" });
    }
  }

  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const note = await this.noteRepository.getNoteById(Number(id));
      if (!note || note.isArchived) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json(note);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving note" });
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const validatedNote = await noteSchema.validate(req.body);
      const { isArchived, ...requiredProps } = validatedNote;
      const newNote = Note.build(requiredProps as Note);
      newNote.isArchived = isArchived; // Set the isArchived property separately
      await this.noteRepository.createNote(newNote);
      res.status(201).json({ message: "Note created successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const validatedNote = await noteSchema.validate(req.body);
      const note = await this.noteRepository.getNoteById(Number(id));
      if (!note || note.isArchived) {
        return res.status(404).json({ message: "Note not found" });
      }
      note.set(validatedNote);
      await this.noteRepository.updateNote(Number(id), note);
      res.json({
        message: "Note updated successfully",
        note: note.toJSON(),
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const note = await this.noteRepository.getNoteById(Number(id));
      if (!note || note.isArchived) {
        return res.status(404).json({ message: "Note not found" });
      }
      await this.noteRepository.deleteNote(Number(id));
      res.json({ message: "Note removed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting note" });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const stats = await this.noteRepository.getStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: "Error retrieving stats" });
    }
  }
}
