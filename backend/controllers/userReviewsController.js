import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import UserReviewer from '../models/userReviewerModel.js';
import nodemailer from 'nodemailer';

// @description: Authenticate a user for a REVIEW and get a token
// @route: POST /api/user-reviews/login
// @access: Public
const authUserReview = asyncHandler(async (req, res) => {
  const { email, password, userProfileId } = req.body;

  const user = await UserReviewer.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userProfileId: userProfileId, // This is the id of the profile of the trainer
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user name or password');
  }
});

// @description: Register new userReviewer
// @route: POST /api/user-reviews
// @access: Public
const registerUserReviewer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await UserReviewer.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const userReviewer = await UserReviewer.create({
    name: name,
    email: email,
    password: password,
  });

  if (userReviewer) {
    res.status(201).json({
      _id: userReviewer._id,
      name: userReviewer.name,
      email: userReviewer.email,
      token: generateToken(userReviewer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { authUserReview, registerUserReviewer };
