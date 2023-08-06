import { Note } from "../models/note";
import { FindOptions } from "sequelize/types";

export class NoteRepository {
  async getAllNotes(): Promise<Note[]> {
    return Note.findAll();
  }

  async getNoteById(id: number): Promise<Note | null> {
    const options: FindOptions = { where: { id } };
    return Note.findByPk(id, options);
  }

  async createNote(newNote: Note): Promise<Note> {
    return await newNote.save();
  }

  async updateNote(
    id: number,
    updatedNote: Note
  ): Promise<{ affectedRows: number; updatedNoteData: Note }> {
    const [affectedRows, [updatedNoteData]] = await Note.update(updatedNote, {
      where: { id },
      returning: true,
    });
    return { affectedRows, updatedNoteData };
  }

  async deleteNote(id: number): Promise<void> {
    const options: FindOptions = { where: { id } };
    const note = await Note.findOne(options);
    if (note) {
      await note.destroy();
    }
  }

  async getStats(): Promise<any> {
    const options: FindOptions = { attributes: ["category", "isArchived"] };
    const notes = await Note.findAll(options);

    const stats: Record<string, Record<string, number>> = {};
    notes.forEach((note) => {
      const { category, isArchived } = note.dataValues;
      if (!stats[category]) {
        stats[category] = { activeNotes: 0, archivedNotes: 0 };
      }
      if (isArchived) {
        stats[category].archivedNotes++;
      } else {
        stats[category].activeNotes++;
      }
    });

    return stats;
  }
}
