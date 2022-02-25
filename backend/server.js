import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

// routers
import authRouter from './routes/authRoutes.js';

// middlewares
import errorHandlerMiddleware from './middlewares/error-handler.js';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/api/v1/auth', authRouter);

app.use(errorHandlerMiddleware);

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
