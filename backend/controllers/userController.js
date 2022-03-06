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

export { updateProfile, addSocialLinks };
