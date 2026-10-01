import express from 'express';
import { check } from 'express-validator';
import { createContactMessage } from '../controllers/contactController.js';
import { validateRequest } from '../middleware/validate.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post(
  '/',
  contactRateLimiter,
  [
    check('name', 'Name is required').not().isEmpty().trim(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number (7-15 chars)').matches(/^[0-9+\-\s]{7,15}$/),
    check('message', 'Message must be at least 10 characters').isLength({ min: 10 }),
  ],
  validateRequest,
  createContactMessage
);

export default router;
