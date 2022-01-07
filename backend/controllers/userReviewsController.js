import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import UserReviewer from '../models/userReviewerModel.js';
import nodemailer from 'nodemailer';

// @description: Authenticate a user for a REVIEW and get a token
// @route: POST /api/users-reviews/login
// @access: Public
const authUserReview = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserReviewer.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user name or password');
  }
});

export { authUserReview };
