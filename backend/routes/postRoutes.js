import express from 'express';
import {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
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
router.route(`/comment/:postId`).post(protect, addComment);
router.route(`/comment/:postId/:commentId`).delete(protect, deleteComment);

export default router;
