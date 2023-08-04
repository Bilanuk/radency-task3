import { Sequelize } from 'sequelize-typescript';
import { Note } from './models/note';
import { seedData } from '../seeds/notesSeedData';

import dotenv from 'dotenv';
dotenv.config();

export async function createDatabaseIfNotExists(connection: Sequelize) {
  try {
    await connection.query(`DROP DATABASE IF EXISTS "${process.env.DATABASE_NAME}"`);
    await connection.query(`CREATE DATABASE "${process.env.DATABASE_NAME}"`);
    console.log(`Database "${process.env.DATABASE_NAME}" created or already exists.`);
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

export async function setupDatabase(connection: Sequelize) {
  try {
    await connection.authenticate();
    await connection.sync({ force: true });
    console.log('Connected to the database and tables created.');
    await Note.bulkCreate(seedData as Note[]);
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
