import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userReviews from './data/userReviewers.js';
import UserReviewer from './models/userReviewerModel.js';
import connectDB from './config/bd.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await UserReviewer.deleteMany();
    await UserReviewer.insertMany(userReviews);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserReviewer.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
