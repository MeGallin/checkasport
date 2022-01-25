import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  getUserProfileById,
  deleteUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users/login', authUser);
router
  .route('/users/:id')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, admin, deleteUser);

router.route('/user/profile/:id').get(getUserProfileById);

router
  .route('/users')
  .post(registerUser)
  .get(protect, admin, getAllUsersProfile);

export default router;
