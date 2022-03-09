import express from 'express';
import { getMe } from '../controllers/profileController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/me`, protect, getMe);

export default router;
