import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import { sendResponse } from '../utils/index.js';

/**
 * @desc    Update profile
 * @route   PATCH /api/v1/user
 * @access  Private
 */
const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

/**
 * @desc    Update profile
 * @route   POST /api/v1/user/socials
 * @access  Private
 */
const addSocialLinks = async (req, res) => {
  const user = await User.create({ socials: req.body });

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

/**
 * @desc    Update password
 * @route   PATCH /api/v1/user/socials
 * @access  Private
 */
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw new BadRequestError(`No user found!`);
  }

  if (!(await user.comparePassword(oldPassword, user.password))) {
    throw new BadRequestError(`Invalid credentials`);
  }

  user.password = newPassword;
  await user.save();

  sendResponse(user, res);
};

export { updateProfile, addSocialLinks, updatePassword };
