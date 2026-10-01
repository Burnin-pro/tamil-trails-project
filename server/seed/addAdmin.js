import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const addAdmin = async () => {
  try {
    await connectDB();

    await Admin.create({
      username: 'Muthupandi',
      password: 'Realmec13@..'
    });

    console.log('Admin user Muthupandi added!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

addAdmin();
