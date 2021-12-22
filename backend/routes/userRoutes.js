import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/api/users/login', authUser);
router
  .route('/api/users/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/api/users').post(registerUser);

export default router;
