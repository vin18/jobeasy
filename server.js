import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

// db
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';

// middlewares
import errorHandlerMiddleware from './middlewares/error-handler.js';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(errorHandlerMiddleware);

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
