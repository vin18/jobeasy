import express from 'express';
import {
  addProject,
  getAllProjects,
} from '../controllers/projectController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').get(getAllProjects).post(protect, addProject);

export default router;
