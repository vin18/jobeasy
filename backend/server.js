import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const start = () => {
  app.listen(PORT, () => {
    console.log(
      `Server listening in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
  });
};

start();
