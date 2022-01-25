import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

import connectDB from './db/connect.js';

dotenv.config();
const app = express();

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`MongoDB Connected`.cyan.underline.bold);

    app.listen(PORT, () => {
      console.log(
        `Server listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
