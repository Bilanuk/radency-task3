import { sequelizeInstance } from "./sequelizeInstance";
import { Note } from "../models/note";
import { notesSeedData } from "./seeds/notesSeedData";

const seedDatabase = async () => {
  try {
    await sequelizeInstance.authenticate();
    sequelizeInstance.addModels([Note]);
    await sequelizeInstance.sync({ force: true });
    await Note.bulkCreate(notesSeedData as Note[]);
    console.log("Seeding complete.");
  } catch (error) {
    console.error("Unable to seed the database:", error);
  }
}

seedDatabase();
