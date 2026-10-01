import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String },
  price: { type: Number, required: true, min: 0 },
  tier: { type: String, enum: ['Basic', 'Standard', 'Premium'], required: true },
  highlights: [String],
  destinations: [String],
  gallery: [String],
  hotelImage: { type: String },
  restaurantImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
