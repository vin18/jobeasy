import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { sendResponse } from '../utils/index.js';

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError(`Please enter all values`);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError(`Email already exists`);
  }

  const user = await User.create({ username, email, password });
  sendResponse(user, res);
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(`Please enter all values`);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new BadRequestError(`Invalid credentials`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError(`Invalid credentials`);
  }

  sendResponse(user, res);
};

/**
 * @desc    Logout user
 * @route   GET /api/v1/auth/logout
 * @access  Public
 */
const logout = (req, res) => {
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User logged out',
  });
};

export { register, login, logout };
