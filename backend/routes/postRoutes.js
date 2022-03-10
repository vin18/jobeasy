import express from 'express';
import {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
} from '../controllers/postController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route(`/`).post(protect, createPost).get(protect, getAllPosts);
router
  .route(`/:postId`)
  .get(protect, getSinglePost)
  .delete(protect, deletePost);

export default router;
