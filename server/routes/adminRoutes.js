import express from 'express';
import Admin from '../models/Admin.js';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Simple login (in production, use bcrypt and JWT)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = username ? username.trim() : '';
    const pass = password ? password.trim() : '';
    
    const admin = await Admin.findOne({ username: user, password: pass });
    
    if (admin) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all bookings/messages (Requires authentication in production)
router.get('/bookings', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
