import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const fixAdmin = async () => {
  try {
    await connectDB();

    // Find the admin user
    let admin = await Admin.findOne({ username: 'Muthupandi' });
    
    if (admin) {
      // Update password to match exactly what the user is typing
      admin.password = 'Realmec13@';
      await admin.save();
      console.log('Admin password updated to Realmec13@');
    } else {
      await Admin.create({
        username: 'Muthupandi',
        password: 'Realmec13@'
      });
      console.log('Admin user Muthupandi created with password Realmec13@');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

fixAdmin();
