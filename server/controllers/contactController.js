import ContactMessage from '../models/ContactMessage.js';
import { sendBookingEmail } from '../utils/emailService.js';

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, packageInterested, message } = req.body;
    
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      packageInterested,
      message,
    });
    
    // Send email notifications
    await sendBookingEmail(email, name, {
      phone,
      packageInterested,
      message
    });
    
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    next(error);
  }
};
