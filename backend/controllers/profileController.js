import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../errors/index.js';
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

/**
 * @desc    Create or update profile
 * @route   POST /api/v1/profile
 * @access  Private
 */
const mutateUserProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    twitter,
    linkedin,
    peerlist,
    blog,
  } = req.body;
  if (!status || !skills) {
    throw new BadRequestError(`Status and skills are required`);
  }

  const profileFields = {};
  profileFields.user = req.user._id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubUsername) profileFields.githubUsername = githubUsername;

  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;
  if (peerlist) profileFields.social.peerlist = peerlist;
  if (blog) profileFields.social.blog = blog;

  let profile = await Profile.findOne({
    user: req.user._id,
  });

  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      profileFields,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(profile);
  } else {
    profile = await Profile.create(profileFields);
  }

  res.status(profile ? StatusCodes.OK : StatusCodes.CREATED).json({
    success: true,
    user: profile,
  });
};

export { getMe, mutateUserProfile };
