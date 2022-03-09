import express from 'express';
import { getMe, mutateUserProfile } from '../controllers/profileController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/me`, protect, getMe);
router.post(`/`, protect, mutateUserProfile);

export default router;
