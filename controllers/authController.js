import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { sendResponse } from '../utils/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError(`Please enter all values`);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError(`Email already exists`);
  }

  const user = await User.create({ name, email, password });
  sendResponse(user, res);
};

export { register };
