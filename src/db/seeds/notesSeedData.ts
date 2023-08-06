import { NoteCategory } from "../../models/note";

export const notesSeedData = [
  {
    name: 'Note 1',
    category: NoteCategory.Idea,
    date: '2023-08-03',
    content: 'Content for Note 1',
    isArchived: true,
  },
  {
    name: 'Note 2',
    category: NoteCategory.Task,
    date: '2023-08-04',
    content: 'Content for Note 2',
    isArchived: false,
  },
  {
    name: 'Note 3',
    category: NoteCategory.RandomThought,
    date: '2023-08-05',
    content: 'Content for Note 3',
    isArchived: false,
  },
  {
    name: 'Note 4',
    category: NoteCategory.Task,
    date: '2023-08-06',
    content: 'Content for Note 4',
    isArchived: false,
  },
  {
    name: 'Note 5',
    category: NoteCategory.Idea,
    date: '2023-08-07',
    content: 'Content for Note 5',
    isArchived: true,
  },
  {
    name: 'Note 6',
    category: NoteCategory.Task,
    date: '2023-08-08',
    content: 'Content for Note 6',
    isArchived: false,
  },
  {
    name: 'Note 7',
    category: NoteCategory.RandomThought,
    date: '2023-08-09',
    content: 'Content for Note 7',
    isArchived: false,
  },
];
