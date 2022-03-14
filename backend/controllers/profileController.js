import mongoose from 'mongoose';
import request from 'request';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Get logged in user's profile
 * @route   GET /api/v1/profile/me
 * @access  Private
 */
const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id }).populate(
    'user',
    ['username', 'image']
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

/**
 * @desc    Get all profiles
 * @route   GET /api/v1/profile
 * @access  Public
 */
const getAllProfiles = async (req, res) => {
  const profiles = await Profile.find().populate('user', ['username', 'image']);
  res.status(StatusCodes.OK).json({
    success: true,
    profiles,
  });
};

/**
 * @desc    Get profile by user id
 * @route   GET /api/v1/profile/user/:userId
 * @access  Public
 */
const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  const profile = await Profile.findOne({ user: userId }).populate('user', [
    'username',
    'image',
  ]);

  if (!profile) {
    throw new NotFoundError(`Profile not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    profile,
  });
};

/**
 * @desc    Delete profile, user & post
 * @route   DELETE /api/v1/profile
 * @access  Private
 */
const deleteUser = async (req, res) => {
  // TODO: Remove users posts

  await Profile.findByIdAndDelete(req.user._id);
  await User.findByIdAndDelete(req.user._id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'User deleted',
  });
};

/**
 * @desc    Add profile experience
 * @route   PATCH /api/v1/profile/experience
 * @access  Private
 */
const addExperience = async (req, res) => {
  const { title, company, from, location, to, current, description } = req.body;
  if (!title || !company || !from) {
    throw new BadRequestError(`Title, company and from fields are required`);
  }

  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user._id });
  profile.experience.unshift(newExperience);
  await profile.save();

  res.status(StatusCodes.OK).json({
    success: true,
    profile,
  });
};

/**
 * @desc    Delete experience
 * @route   DELETE /api/v1/profile/experience/:expId
 * @access  Private
 */
const deleteExperience = async (req, res) => {
  const { expId } = req.params;
  let profile = await Profile.findOne({ user: req.user._id });
  console.log(profile);
  profile.experience = profile.experience.filter((p) => p._id === expId);

  await profile.save();

  res.status(StatusCodes.OK).json({
    success: true,
    profile,
  });
};

/**
 * @desc    Get user repositories from github
 * @route   GET /api/v1/profile/github/:username
 * @access  Public
 */
const getUserRepos = async (req, res) => {
  const { username } = req.params;
  const options = {
    uri: `https://api.github.com/users/${username}/repos?per_page=4&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
    method: `GET`,
    headers: { 'user-agent': 'node.js' },
  };

  request(options, (error, response, body) => {
    if (error) console.error(error);

    if (response.statusCode !== 200) {
      throw new NotFoundError(`No github profile found`);
    }

    res.status(StatusCodes.OK).json({
      success: true,
      githubProfile: JSON.parse(body),
    });
  });
};

export {
  getProfile,
  mutateUserProfile,
  getAllProfiles,
  getUserProfile,
  deleteUser,
  addExperience,
  deleteExperience,
  getUserRepos,
};
