import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Package from '../models/Package.js';
import connectDB from '../config/db.js';

dotenv.config();

const scrapeImages = async (query, count) => {
  try {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`;
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const $ = cheerio.load(res.data);
    const images = [];
    $('.mimg').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src && src.startsWith('http') && images.length < count) {
        images.push(src);
      }
    });
    return images;
  } catch (error) {
    console.error(`Error scraping ${query}:`, error.message);
    return [];
  }
};

const updateImages = async () => {
  try {
    await connectDB();
    const packages = await Package.find();
    
    for (const pkg of packages) {
      console.log(`Updating images for ${pkg.name}...`);
      const dest = pkg.destinations[0] || pkg.name;
      
      const gallery = await scrapeImages(`${dest} Tamil Nadu tourism`, 3);
      const hotelImg = await scrapeImages(`${dest} luxury hotel room`, 1);
      const restaurantImg = await scrapeImages(`${dest} traditional restaurant food`, 1);
      
      if (gallery.length === 3) pkg.gallery = gallery;
      if (hotelImg.length > 0) pkg.hotelImage = hotelImg[0];
      if (restaurantImg.length > 0) pkg.restaurantImage = restaurantImg[0];
      
      await pkg.save();
      // Sleep for a second to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log('Images updated successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

updateImages();
