import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
} from '../controllers/authController.js';
import protect from '../middlewares/authorization.js';
const router = express.Router();

router.post(`/register`, register);
router.post(`/login`, login);
router.get(`/logout`, protect, logout);
router.get(`/me`, protect, getMe);

export default router;
