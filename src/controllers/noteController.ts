import { Request, Response } from "express";
import { catchError } from "../helpers/decorators/catchError";
import noteSchema from "../helpers/validators/noteSchema";
import { dateParser } from "../helpers/parsers/dateParser";

import { Note } from "../models/note";
import { NoteRepository } from "../repositories/noteRepository";

export class NoteController {
  private noteRepository: NoteRepository;

  constructor() {
    this.noteRepository = new NoteRepository();
  }

  @catchError
  async getAllNotes(req: Request, res: Response) {
    const notes = await this.noteRepository.getAllNotes();
    res.json(notes);
  }

  @catchError
  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const note = await this.noteRepository.getNoteById(Number(id));
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  }

  @catchError
  async createNote(req: Request, res: Response) {
    const validatedNote = await noteSchema.validate({
      ...req.body,
      dates: undefined,
      ...(req.body.content && { dates: dateParser(req.body.content) }),
    });
    const newNote = Note.build(validatedNote as Note);
    const note = await this.noteRepository.createNote(newNote);
    res.status(201).json({ message: "Note created successfully", note });
  }

  @catchError
  async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const validatedNote = await noteSchema.validate({
      ...req.body,
      dates: undefined,
      ...(req.body.content && { dates: dateParser(req.body.content) }),
    });
    const { affectedRows, updatedNoteData } =
      await this.noteRepository.updateNote(Number(id), validatedNote as Note);
    if (!affectedRows) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note updated successfully", updatedNoteData });
  }

  @catchError
  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const note = await this.noteRepository.getNoteById(Number(id));
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await this.noteRepository.deleteNote(Number(id));
    res.json({ message: "Note removed successfully" });
  }

  @catchError
  async getStats(req: Request, res: Response) {
    const stats = await this.noteRepository.getStats();
    res.json(stats);
  }
}
