import express from 'express';
import { getAllProfiles } from '../controllers/profileController.js';

const router = express.Router();

router.route('/api/user/profiles').get(getAllProfiles);

export default router;
