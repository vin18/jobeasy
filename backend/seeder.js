import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import usersData from './mockData/users.js';
import User from './models/userModel.js';
import Project from './models/projectModel.js';
import Blog from './models/blogModel.js';

dotenv.config();
await connectDb(process.env.MONGO_URI);

const importData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Blog.deleteMany();
    await User.insertMany(usersData);

    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Blog.deleteMany();

    console.log(`Data Deleted`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
