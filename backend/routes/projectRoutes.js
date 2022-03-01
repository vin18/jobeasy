import express from 'express';
import {
  addProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from '../controllers/projectController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').get(getAllProjects).post(protect, addProject);
router
  .route('/:projectId')
  .delete(protect, deleteProject)
  .patch(protect, updateProject);

export default router;
