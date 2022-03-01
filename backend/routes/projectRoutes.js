import express from 'express';
import {
  addProject,
  deleteProject,
  getAllProjects,
} from '../controllers/projectController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').get(getAllProjects).post(protect, addProject);
router.route('/:projectId').delete(protect, deleteProject);

export default router;
