import mongoose from 'mongoose';
import dotenv from 'dotenv';
import profiles from './data/profiles.js';
import Profile from './models/profileModel.js';
import connectDB from './config/bd.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Profile.deleteMany();
    await Profile.insertMany(profiles);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Profile.deleteMany();

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
