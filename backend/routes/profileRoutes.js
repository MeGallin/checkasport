import express from 'express';
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
} from '../controllers/profileController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/api/profiles').get(getAllProfiles).post(protect, createProfile);
router
  .route('/api/profile/:id')
  .get(getProfileById)
  .put(protect, updateProfile);

export default router;
