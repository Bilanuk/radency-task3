import { Sequelize } from 'sequelize-typescript';
import { Note } from './models/note';
import { seedData } from '../seeds/notesSeedData';

export async function createDatabaseIfNotExists(connection: Sequelize) {
  try {
    await connection.query(`DROP DATABASE IF EXISTS "${process.env.DATABASE_NAME}"`);
    await connection.query(`CREATE DATABASE "${process.env.DATABASE_NAME}"`);
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

export async function setupDatabase(connection: Sequelize) {
  try {
    connection.options.database = process.env.DATABASE_NAME;
    await connection.authenticate();
    console.log('Connected to the database and tables created.');
    connection.addModels([Note]);
    await connection.sync({ force: true });
    await Note.bulkCreate(seedData as Note[]);
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export async function initializeDatabase() {
  const sequelize = createConnection();

  await createDatabaseIfNotExists(sequelize);
  await setupDatabase(sequelize);
}

function createConnection(): Sequelize {
  return new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });
}
