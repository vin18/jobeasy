import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthorizedError } from '../errors/index.js';
import Post from '../models/postModel.js';
import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Create a post
 * @route   POST /api/v1/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    throw new BadRequestError('Text is required');
  }

  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });
  const newPost = await Post.create({
    text,
    name: user.username,
    avatar: user.avatar,
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    post: newPost,
  });
};

/**
 * @desc    Get all posts
 * @route   GET /api/v1/posts
 * @access  Private
 */
const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });

  res.status(StatusCodes.OK).json({
    success: true,
    posts,
  });
};

/**
 * @desc    Get single post
 * @route   GET /api/v1/posts/:postId
 * @access  Private
 */
const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.postId).sort({ date: -1 });

  if (!post) {
    throw new BadRequestError(`No post found!`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

/**
 * @desc    Delete single post
 * @route   DELETE /api/v1/posts/:postId
 * @access  Private
 */
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    throw new BadRequestError(`No post found!`);
  }

  if (String(post.user) !== String(req.user._id)) {
    throw new UnauthorizedError(`User not authorized`);
  }

  await post.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Post deleted`,
  });
};

/**
 * @desc    Like a post
 * @route   PATCH /api/v1/posts/like/:postId
 * @access  Private
 */
const likePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    throw new BadRequestError(`No post found!`);
  }

  // Check if the post has already been liked
  const isPostLiked = post.likes.find(
    (like) => String(like.user) === String(req.user._id)
  );

  if (isPostLiked) {
    throw new BadRequestError(`Post already liked!`);
  }

  post.likes.unshift({ user: req.user._id });
  await post.save();

  res.status(StatusCodes.OK).json({
    success: true,
    likes: post.likes,
  });
};

/**
 * @desc    Unlike a post
 * @route   PATCH /api/v1/posts/unlike/:postId
 * @access  Private
 */
const unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    throw new BadRequestError(`No post found!`);
  }

  // Check if the post has already been liked
  const isPostLiked = post.likes.find(
    (like) => String(like.user) === String(req.user._id)
  );

  if (!isPostLiked) {
    throw new BadRequestError(`Post has not yet been liked!`);
  }

  post.likes = post.likes.filter(
    (like) => String(like.user) !== String(req.user._id)
  );
  await post.save();

  res.status(StatusCodes.OK).json({
    success: true,
    likes: post.likes,
  });
};

export {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
};
