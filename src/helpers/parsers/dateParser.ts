import { dateRegex } from "../../../constants";

export const dateParser = (content: string): string[] => {
  const dates = content.match(dateRegex);
  return dates || [];
}
