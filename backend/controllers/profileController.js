import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Get logged in user
 * @route   GET /api/v1/profile/me
 * @access  Private
 */
const getMe = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    'user',
    ['name', 'image']
  );

  if (!profile) {
    throw new NotFoundError(`User not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user: profile,
  });
};

export { getMe };
