import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';

// @description: Get All the Profiles
// @route: GET /api/profiles
// @access: Public
const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({});
  if (profiles) {
    res.json(profiles);
  } else {
    res.status(404);
    throw new Error('No profiles found');
  }
});

// @description: Fetch single Profile
// @route: GET /api/profile/:id
// @access: Public
const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

export { getAllProfiles, getProfileById };
