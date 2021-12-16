import asyncHandler from 'express-async-handler';
import services from '../data/services.js';

// @description: Fetch all Services
// @route: GET /api/services
// @access: Public
const getServices = asyncHandler(async (req, res) => {
  if (services) {
    res.status(200).json(services);
  } else {
    res.status(400).json({
      message: 'There was an error getting your data. Please try again.',
    });
  }
});

export { getServices };
