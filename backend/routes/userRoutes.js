import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/api/users/login', authUser);
router.route('/api/users/profile').get(protect, getUserProfile);

router.route('/api/users').post(registerUser);

export default router;
