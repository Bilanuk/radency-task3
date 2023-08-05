import { Model, Column, Table, DataType } from 'sequelize-typescript';

export enum NoteCategory {
  Idea = 'Idea',
  Task = 'Task',
  RandomThought = 'Random Thought',
}

@Table
export class Note extends Model<Note> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  name!: string;

  @Column({ type: DataType.ENUM, values: Object.values(NoteCategory) })
  category!: NoteCategory;

  @Column
  date!: string;

  @Column
  content!: string;

  @Column({ defaultValue: false })
  isArchived!: boolean;
}
