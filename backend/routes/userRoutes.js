import express from 'express';
import { updateProfile } from '../controllers/userController.js';
const router = express.Router();

router.route('/').patch(updateProfile);

export default router;
