import { Note } from "../models/note";
import { FindOptions, Sequelize } from "sequelize";

export class NoteRepository {
  async getAllNotes(): Promise<Note[]> {
    return Note.findAll();
  }

  async getNoteById(id: number): Promise<Note | null> {
    const options: FindOptions = { where: { id } };
    return Note.findByPk(id, options);
  }

  async createNote(newNote: Note): Promise<void> {
    await newNote.save();
  }

  async updateNote(id: number, updatedNote: Note): Promise<void> {
    const options: FindOptions = {
      where: { id, isArchived: false },
    };
    const note = await Note.findOne(options);
    if (note) {
      await note.update(updatedNote.dataValues);
    }
  }

  async deleteNote(id: number): Promise<void> {
    const options: FindOptions = { where: { id } };
    const note = await Note.findOne(options);
    if (note) {
      await note.destroy();
    }
  }

  async getStats(): Promise<Record<string, Record<string, number>>> {
    const options: FindOptions = {
      attributes: [
        "category",
        "isArchived",
        [Sequelize.fn("COUNT", Sequelize.col("category")), "count"],
      ],
      group: ["category", "isArchived"],
    };
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
