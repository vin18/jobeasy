import express from 'express';
import {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/postController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route(`/`).post(protect, createPost).get(protect, getAllPosts);
router
  .route(`/:postId`)
  .get(protect, getSinglePost)
  .delete(protect, deletePost);
router.route(`/like/:postId`).patch(protect, likePost);
router.route(`/unlike/:postId`).patch(protect, unlikePost);

export default router;
