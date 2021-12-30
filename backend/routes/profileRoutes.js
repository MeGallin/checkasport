import express from 'express';
import {
  getAllProfiles,
  getProfileById,
} from '../controllers/profileController.js';

const router = express.Router();

router.route('/api/profiles').get(getAllProfiles);
router.route('/api/profile/:id').get(getProfileById);

export default router;
