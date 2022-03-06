import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').patch(protect, updateProfile);
router.route('/socials').post(protect, updateProfile);

export default router;
