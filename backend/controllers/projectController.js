import cloudinary from 'cloudinary';
import Project from '../models/projectModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

/**
 * @desc    Get all projects
 * @route   GET /api/v1/projects
 * @access  Public
 */
const getAllProjects = async (req, res) => {
  const projects = await Project.find();

  res.status(StatusCodes.OK).json({
    success: true,
    projects,
  });
};

/**
 * @desc    Add project
 * @route   POST /api/v1/projects
 * @access  Private
 */
const addProject = async (req, res) => {
  const { projectName, projectDescription, projectImage } = req.body;

  const uploadedImage = await cloudinary.v2.uploader.upload(projectImage, {
    folder: `jobeasy/projects`,
  });

  const project = await Project.create({
    name: projectName,
    description: projectDescription,
    image: {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    project,
  });
};

/**
 * @desc    Update project
 * @route   PATCH /api/v1/projects/:projectId
 * @access  Private
 */
const updateProject = async (req, res) => {
  const { projectName, projectDescription, image, imageInBase64 } = req.body;

  await cloudinary.v2.uploader.destroy(image.public_id);
  const uploadedImage = await cloudinary.v2.uploader.upload(imageInBase64, {
    folder: 'jobeasy/projects',
  });

  req.body.image = {
    public_id: uploadedImage.public_id,
    url: uploadedImage.secure_url,
  };

  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    {
      name: projectName,
      description: projectDescription,
      image: uploadedImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    project,
  });
};

/**
 * @desc    Delete project
 * @route   DELETE /api/v1/projects/:projectId
 * @access  Private
 */
const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.projectId);

  res.status(StatusCodes.OK).json({
    success: true,
    project: null,
  });
};

export { addProject, getAllProjects, updateProject, deleteProject };
