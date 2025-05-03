import db from '../config/connection.js';
import { Question } from '../models/index.js'
import cleanDB from './cleanDb.js';
import { readFile } from 'fs/promises';

// Load JSON file manually
const data = await readFile(new URL('./pythonQuestions.json', import.meta.url));
const questionData = JSON.parse(data.toString());

try {
  await db();
  await cleanDB();

  // bulk create each model
  await Question.insertMany(questionData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
