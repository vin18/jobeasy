import express from 'express';
import {
  getMe,
  mutateUserProfile,
  getAllProfiles,
  getUserProfile,
  deleteUser,
} from '../controllers/profileController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/me`, protect, getMe);
router
  .route(`/`)
  .get(getAllProfiles)
  .post(protect, mutateUserProfile)
  .delete(protect, deleteUser);
router.route('/user/:userId').get(getUserProfile);

export default router;
