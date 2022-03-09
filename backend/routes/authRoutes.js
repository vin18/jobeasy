import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.get(`/logout`, protect, logout);

export default router;
