import fs from 'fs';
import path from 'path';

// Load existing data
const dataPath = path.join(process.cwd(), 'src', 'data', 'mockPackages.js');
let content = fs.readFileSync(dataPath, 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
let packages = JSON.parse(jsonStr);

const themedImages = {
  hill: {
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    ],
    hotel: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80", // mountain resort
    food: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80" // cozy cafe
  },
  coast: {
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
    ],
    hotel: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80", // beach resort
    food: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" // seafood/coastal dining
  },
  heritage: {
    gallery: [
      "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
    ],
    hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", // traditional/heritage hotel
    food: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" // south indian thali
  },
  city: {
    gallery: [
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    ],
    hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", // city hotel
    food: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" // modern restaurant
  }
};

const hillStations = ["ooty", "kodaikanal", "yercaud", "coonoor", "valparai", "yelagiri", "megamalai", "kolli", "hogenakkal", "courtallam"];
const coastal = ["chennai", "mahabalipuram", "rameshwaram", "kanyakumari", "tuticorin", "nagapattinam"];
const city = ["coimbatore", "madurai", "tiruchirappalli"];

packages = packages.map(pkg => {
  const title = pkg.title.toLowerCase();
  
  let category = 'heritage'; // default
  if (hillStations.some(h => title.includes(h))) category = 'hill';
  else if (coastal.some(c => title.includes(c))) category = 'coast';
  else if (city.some(c => title.includes(c))) category = 'city';

  const theme = themedImages[category];

  return {
    ...pkg,
    gallery: [
      pkg.image,
      theme.gallery[0],
      theme.gallery[1]
    ],
    hotelImage: theme.hotel,
    restaurantImage: theme.food
  };
});

const newContent = `// Auto-generated 30+ places mock data\nexport const mockPackages = ${JSON.stringify(packages, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent);
console.log('Fixed packages successfully!');
