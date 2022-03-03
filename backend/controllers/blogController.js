import cloudinary from 'cloudinary';
import Blog from '../models/blogModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

/**
 * @desc    Get all blogs
 * @route   GET /api/v1/blogs
 * @access  Public
 */
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();

  res.status(StatusCodes.OK).json({
    success: true,
    blogs,
  });
};

/**
 * @desc    Add blog
 * @route   POST /api/v1/blogs
 * @access  Private
 */
const addBlog = async (req, res) => {
  const { blogName, blogDescription, blogImage } = req.body;

  const uploadedImage = await cloudinary.v2.uploader.upload(blogImage, {
    folder: `jobeasy/blogs`,
  });

  const blog = await Blog.create({
    name: blogName,
    description: blogDescription,
    image: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    blog,
  });
};

/**
 * @desc    Update blog
 * @route   PATCH /api/v1/blogs/:blogId
 * @access  Private
 */
const updateBlog = async (req, res) => {
  const { blogName, blogDescription, image, imageInBase64 } = req.body;

  await cloudinary.v2.uploader.destroy(image.public_id);
  const uploadedImage = await cloudinary.v2.uploader.upload(imageInBase64, {
    folder: 'jobeasy/blogs',
  });

  req.body.image = {
    public_id: uploadedImage.public_id,
    url: uploadedImage.secure_url,
  };

  const blog = await Blog.findByIdAndUpdate(
    req.params.blogId,
    {
      name: blogName,
      description: blogDescription,
      image: uploadedImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    blog,
  });
};

/**
 * @desc    Delete blog
 * @route   DELETE /api/v1/blogs/:blogId
 * @access  Private
 */
const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.blogId);

  res.status(StatusCodes.OK).json({
    success: true,
    blog: null,
  });
};

export { addBlog, getAllBlogs, updateBlog, deleteBlog };
