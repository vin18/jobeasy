import express from 'express';
import {
  getProfile,
  mutateUserProfile,
  getAllProfiles,
  getUserProfile,
  deleteUser,
  addExperience,
  deleteExperience,
  getUserRepos,
} from '../controllers/profileController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/me`, protect, getProfile);
router
  .route(`/`)
  .get(getAllProfiles)
  .post(protect, mutateUserProfile)
  .delete(protect, deleteUser);
addExperience;
router.route('/user/:userId').get(getUserProfile);
router.route('/experience').patch(protect, addExperience);
router.route('/experience/:expId').delete(protect, deleteExperience);
router.route('/github/:username').get(getUserRepos);

export default router;
