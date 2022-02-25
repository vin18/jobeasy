import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import NotFoundError from '../errors/not-found.js';
import UnauthorizedError from '../errors/unauthorized.js';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError(`You need to login to access this route.`);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new NotFoundError(`User no longer exists!`);
  }

  req.user = user;
  next();
};

export default protect;
