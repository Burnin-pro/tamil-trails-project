import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^[0-9+\-\s]{7,15}$/, 'Please use a valid phone number']
  },
  packageInterested: { type: String },
  message: { type: String, required: true, minlength: 10 },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
