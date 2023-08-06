import * as yup from "yup";
import { NoteCategory } from "../../models/note";

const noteSchema = yup.object().shape({
  name: yup.string(),
  category: yup.string().oneOf(Object.values(NoteCategory)),
  date: yup.string(),
  content: yup.string(),
  isArchived: yup.boolean(),
});

export default noteSchema;
