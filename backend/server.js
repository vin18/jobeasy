import express from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

// routers
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import profileRouter from './routes/profileRoutes.js';

// middlewares
import errorHandlerMiddleware from './middlewares/error-handler.js';

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/blogs', blogRouter);

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
