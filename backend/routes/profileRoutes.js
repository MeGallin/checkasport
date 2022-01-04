import express from 'express';
import {
  getAllProfiles,
  getAllProfilesAdmin,
  getProfileById,
  createProfile,
  getProfile,
  updateProfile,
} from '../controllers/profileController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/api/profiles').get(getAllProfiles).post(protect, createProfile);

router
  .route('/api/profile/:id')
  .get(getProfileById)
  .put(protect, updateProfile);

router.route('/api/profile').get(protect, getProfile);
//Get all profiles ADMIN route
router.route('/api/profiles/admin').get(protect, admin, getAllProfilesAdmin);

export default router;
