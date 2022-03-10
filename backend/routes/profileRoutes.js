import express from 'express';
import {
  getMe,
  mutateUserProfile,
  getAllProfiles,
  getUserProfile,
} from '../controllers/profileController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/me`, protect, getMe);
router.route(`/`).get(getAllProfiles).post(protect, mutateUserProfile);
router.route('/user/:userId').get(getUserProfile);

export default router;
