import express from 'express';
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from '../controllers/blogController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').get(getAllBlogs).post(protect, addBlog);
router
  .route('/:projectId')
  .delete(protect, deleteBlog)
  .patch(protect, updateBlog);

export default router;
