import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question } from '../models/index.js';
import cleanDB from './cleanDb.js';
import { readFile } from 'fs/promises';

dotenv.config();

// Load JSON file manually
const data = await readFile(new URL('./pythonQuestions.json', import.meta.url));
const questionData = JSON.parse(data);

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await cleanDB();
        await Question.insertMany(questionData);
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();