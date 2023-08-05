import { NoteCategory } from "../../models/note";
import * as yup from "yup";

export const noteSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().oneOf(Object.values(NoteCategory)).required(),
  date: yup.string().required(),
  content: yup.string().required(),
  isArchived: yup.boolean().required(),
});
