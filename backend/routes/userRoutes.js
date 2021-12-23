import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/api/users/login', authUser);
router
  .route('/api/users/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/api/users').post(registerUser).get(getAllUsersProfile);

export default router;
