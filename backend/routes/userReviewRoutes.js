import express from 'express';
import {
  authUserReview,
  registerUserReviewer,
} from '../controllers/userReviewsController.js';

const router = express.Router();

router.post('/api/users-review/login', authUserReview);
router.post('/api/users-review', registerUserReviewer);

export default router;
