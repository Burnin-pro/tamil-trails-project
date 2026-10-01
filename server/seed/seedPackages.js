import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from '../models/Package.js';
import { mockPackages } from '../../tamil-trails/src/data/mockPackages.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedPackages = async () => {
  try {
    await connectDB();
    await Package.deleteMany();

    const packages = mockPackages.map(pkg => {
      // Determine tier based on price
      let tier = 'Standard';
      if (pkg.price < 8000) tier = 'Basic';
      if (pkg.price > 12000) tier = 'Premium';

      return {
        name: pkg.title,
        slug: pkg.title.toLowerCase().replace(/ /g, '-'),
        description: pkg.description,
        image: pkg.image,
        duration: pkg.duration,
        price: pkg.price,
        tier: tier,
        highlights: pkg.highlights,
        destinations: [pkg.title.replace(' Getaway', '')],
        gallery: pkg.gallery || [],
        hotelImage: pkg.hotelImage || '',
        restaurantImage: pkg.restaurantImage || ''
      };
    });

    await Package.insertMany(packages);
    console.log('Packages Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedPackages();
