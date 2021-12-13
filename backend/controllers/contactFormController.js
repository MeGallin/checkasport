import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

// @description: Send Email of details from contact form
// @route: POST /api/send
// @access: Public

const sendContactForm = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if ((name, email, message)) {
    res.status(201).json({
      message: 'Contact form sent successfully',
    });
    // nodemailer stuff to follow
  }
});

export { sendContactForm };
