import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ rating: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};
