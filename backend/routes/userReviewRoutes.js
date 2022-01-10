import express from 'express';
import {
  authUserReview,
  registerUserReviewer,
  getAllUsersReviews,
  deleteReviewer,
} from '../controllers/userReviewsController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/api/reviewers/admin/:id', protect, admin, getAllUsersReviews);
router.delete('/api/reviewer/admin/:id', protect, admin, deleteReviewer);
router.post('/api/users-review/login', authUserReview);
router.post('/api/users-review', registerUserReviewer);

export default router;
