import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  photo: { type: String },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
