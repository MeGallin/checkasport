import express from 'express';
import { sendContactForm } from '../controllers/contactFormController.js';

const router = express.Router();
router.route('/api/send').post(sendContactForm);

export default router;
