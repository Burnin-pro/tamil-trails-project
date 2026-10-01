import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Testimonial from '../models/Testimonial.js';
import { mockTestimonials } from '../../tamil-trails/src/data/mockTestimonials.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedTestimonials = async () => {
  try {
    await connectDB();
    await Testimonial.deleteMany();

    const testimonials = mockTestimonials.map(test => {
      return {
        name: test.name,
        location: test.location,
        quote: test.quote,
        rating: test.rating,
        photo: test.image // Keep as is, or adjust if moved to /images/testimonials
      };
    });

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedTestimonials();
