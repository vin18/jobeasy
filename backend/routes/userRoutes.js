import express from 'express';
import {
  updateProfile,
  addSocialLinks,
  updatePassword,
} from '../controllers/userController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').patch(protect, updateProfile);
router.post('/socials', protect, addSocialLinks);
router.patch('/change-password', protect, updatePassword);

export default router;
