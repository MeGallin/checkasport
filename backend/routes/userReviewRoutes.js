import express from 'express';
import { authUserReview } from '../controllers/userReviewsController.js';

const router = express.Router();

router.post('/api/users-review/login', authUserReview);

export default router;
