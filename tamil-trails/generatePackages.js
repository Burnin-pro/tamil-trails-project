import fs from 'fs';
import path from 'path';

const places = [
  { name: 'Chennai', desc: "The Gateway of South India, known for Marina Beach and Kapaleeshwarar Temple.", duration: "3 Days, 2 Nights", price: 12000, highlights: ["Marina Beach", "Fort St. George", "Mylapore"] },
  { name: 'Mahabalipuram', desc: "Ancient Pallava port city with stunning rock-cut shore temples.", duration: "2 Days, 1 Night", price: 8500, highlights: ["Shore Temple", "Pancha Rathas", "Butter Ball"] },
  { name: 'Kanchipuram', desc: "The city of thousand temples and exquisite silk sarees.", duration: "2 Days, 1 Night", price: 7000, highlights: ["Kailasanathar Temple", "Silk Weaving", "Ekambareswarar"] },
  { name: 'Madurai', desc: "The Athens of the East, home to the magnificent Meenakshi Amman Temple.", duration: "3 Days, 2 Nights", price: 15000, highlights: ["Meenakshi Temple", "Thirumalai Nayakkar Mahal", "Jigarthanda"] },
  { name: 'Rameshwaram', desc: "Sacred island city known for its Ramanathaswamy Temple and Pamban Bridge.", duration: "2 Days, 2 Nights", price: 14000, highlights: ["Ramanathaswamy Temple", "Dhanushkodi", "Pamban Bridge"] },
  { name: 'Kanyakumari', desc: "The southernmost tip of India where three seas meet.", duration: "2 Days, 1 Night", price: 10000, highlights: ["Vivekananda Rock", "Thiruvalluvar Statue", "Sunset View"] },
  { name: 'Ooty', desc: "The Queen of Hill Stations in the Nilgiris.", duration: "4 Days, 3 Nights", price: 22000, highlights: ["Botanical Garden", "Ooty Lake", "Nilgiri Mountain Railway"] },
  { name: 'Kodaikanal', desc: "The Princess of Hill Stations with misty lakes and pine forests.", duration: "3 Days, 2 Nights", price: 18000, highlights: ["Kodai Lake", "Coaker's Walk", "Pillar Rocks"] },
  { name: 'Thanjavur', desc: "The rice bowl of Tamil Nadu, famous for the Brihadeeswarar Temple.", duration: "2 Days, 1 Night", price: 9000, highlights: ["Brihadeeswarar Temple", "Tanjore Art", "Maratha Palace"] },
  { name: 'Tiruchirappalli', desc: "Known for the Rockfort Temple and the massive Srirangam Temple.", duration: "2 Days, 1 Night", price: 8000, highlights: ["Rockfort", "Srirangam", "Jambukeshwarar"] },
  { name: 'Coimbatore', desc: "The Manchester of South India, gateway to the Nilgiris.", duration: "2 Days, 1 Night", price: 9500, highlights: ["Marudhamalai", "Adiyogi Shiva", "Textile Markets"] },
  { name: 'Yercaud', desc: "A serene hill station in the Shevaroy Hills.", duration: "2 Days, 1 Night", price: 11000, highlights: ["Yercaud Lake", "Lady's Seat", "Killiyur Falls"] },
  { name: 'Hogenakkal', desc: "The Niagara of India, famous for coracle rides and waterfalls.", duration: "1 Day", price: 4000, highlights: ["Waterfalls", "Coracle Ride", "Fish Fry"] },
  { name: 'Coonoor', desc: "Known for its production of Nilgiri tea and the Sim's Park.", duration: "2 Days, 1 Night", price: 12000, highlights: ["Sim's Park", "Dolphin's Nose", "Tea Gardens"] },
  { name: 'Chidambaram', desc: "Home to the famous Thillai Nataraja Temple.", duration: "2 Days, 1 Night", price: 7500, highlights: ["Nataraja Temple", "Pichavaram Mangrove", "Annamalai University"] },
  { name: 'Kumbakonam', desc: "The temple town known for the Mahamaham festival.", duration: "2 Days, 1 Night", price: 8500, highlights: ["Airavatesvara Temple", "Sarangapani Temple", "Degree Coffee"] },
  { name: 'Velankanni', desc: "Renowned for the Basilica of Our Lady of Good Health.", duration: "2 Days, 1 Night", price: 8000, highlights: ["Velankanni Church", "Velankanni Beach", "Museum"] },
  { name: 'Tirunelveli', desc: "Known for the Nellaiappar Temple and Halwa.", duration: "2 Days, 1 Night", price: 7500, highlights: ["Nellaiappar Temple", "Iruttu Kadai Halwa", "Tamirabarani River"] },
  { name: 'Courtallam', desc: "The Spa of South India, famous for its numerous waterfalls.", duration: "2 Days, 1 Night", price: 9000, highlights: ["Main Falls", "Five Falls", "Old Courtallam"] },
  { name: 'Chettinad', desc: "Famous for its unique architecture, mansions, and spicy cuisine.", duration: "2 Days, 1 Night", price: 13000, highlights: ["Chettinad Palace", "Athangudi Tiles", "Spicy Food"] },
  { name: 'Tiruvannamalai', desc: "Home to the Arunachalesvara Temple and Mount Arunachala.", duration: "2 Days, 1 Night", price: 6500, highlights: ["Arunachalesvara Temple", "Ramana Ashram", "Girivalam"] },
  { name: 'Vellore', desc: "Known for the historic Vellore Fort and Golden Temple.", duration: "2 Days, 1 Night", price: 7000, highlights: ["Vellore Fort", "Golden Temple", "CMC"] },
  { name: 'Valparai', desc: "A pristine hill station surrounded by tea and coffee estates.", duration: "3 Days, 2 Nights", price: 16000, highlights: ["Tea Estates", "Sholayar Dam", "Aliyar Dam"] },
  { name: 'Yelagiri', desc: "A peaceful hill station in Vellore district.", duration: "2 Days, 1 Night", price: 8500, highlights: ["Punganur Lake", "Jalagamparai Falls", "Nature Park"] },
  { name: 'Palani', desc: "Home to one of the six abodes of Lord Murugan.", duration: "1 Day", price: 4500, highlights: ["Murugan Temple", "Rope Car", "Panchamirtham"] },
  { name: 'Megamalai', desc: "The High Wavy Mountains, an unexplored eco-tourism spot.", duration: "3 Days, 2 Nights", price: 15000, highlights: ["Tea Estates", "Megamalai Falls", "Wildlife"] },
  { name: 'Kolli Hills', desc: "Known for its 70 hairpin bends and Agaya Gangai waterfalls.", duration: "2 Days, 1 Night", price: 10000, highlights: ["Hairpin Bends", "Agaya Gangai", "Arapaleeswarar Temple"] },
  { name: 'Dindigul', desc: "Famous for its Rock Fort and delicious Biryani.", duration: "1 Day", price: 3500, highlights: ["Dindigul Fort", "Thalappakatti Biryani", "Sirumalai"] },
  { name: 'Tuticorin', desc: "The Pearl City of India, known for its port and macaroons.", duration: "2 Days, 1 Night", price: 7000, highlights: ["Our Lady of Snows", "Hare Island", "Macaroons"] },
  { name: 'Nagapattinam', desc: "A coastal town with rich religious heritage.", duration: "2 Days, 1 Night", price: 6500, highlights: ["Nagore Dargah", "Sikkal Singaravelar", "Kodikkarai Wildlife"] },
  { name: 'Pudukkottai', desc: "Known for its archaeological monuments and temples.", duration: "2 Days, 1 Night", price: 6000, highlights: ["Thirumayam Fort", "Sittanavasal Cave", "Museum"] },
  { name: 'Auroville', desc: "An experimental township dedicated to human unity.", duration: "2 Days, 1 Night", price: 9000, highlights: ["Matrimandir", "Auroville Beach", "Boutiques"] }
];

const publicDir = path.join(process.cwd(), 'public');
const galleryDir = path.join(publicDir, 'gallery');
const stayDir = path.join(publicDir, 'stay');

[galleryDir, stayDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const FALLBACK_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Brihadeeswarar_Temple_at_Thanjavur.jpg/800px-Brihadeeswarar_Temple_at_Thanjavur.jpg";

async function fetchImagesCommons(query, limit = 1) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
  
  try {
    const res = await fetch(searchUrl, {
      headers: { 'User-Agent': 'TamilTrailsViteApp/1.0 (dev@tamiltrails.local)' }
    });
    if (!res.ok) {
      console.error(`Wikimedia API error for ${query}: ${res.status}`);
      return [];
    }
    const text = await res.text();
    if (text.startsWith('<')) {
      console.error(`Wikimedia API returned HTML for ${query}. Blocked?`);
      return [];
    }
    const json = JSON.parse(text);
    if (json.query && json.query.pages) {
      const pages = Object.values(json.query.pages);
      return pages.map(p => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url).filter(Boolean);
    }
  } catch (e) {
    console.error(`Error fetching from Wikimedia for ${query}:`, e);
  }
  return [];
}

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      }
    });
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
  } catch (e) {
    console.error(`Error downloading image from ${url}:`, e);
  }
}

async function main() {
  console.log('Starting massive image generation...');
  const mockData = [];
  
  // We'll process just the first 10 so it doesn't take 20 minutes, 
  // but let's do all 32 and use Promise.all for speed.
  // Actually, to avoid rate limits, we'll do them sequentially.
  for (let i = 0; i < places.length; i++) {
    const place = places[i];
    console.log(`[${i+1}/${places.length}] Processing ${place.name}...`);
    
    // Gallery (2 extra images)
    const galleryUrls = await fetchImagesCommons(`${place.name} tourism`, 2);
    const galleryPaths = [];
    for (let j = 0; j < 2; j++) {
      let url = galleryUrls[j];
      if (!url || url.endsWith('.svg') || url.endsWith('.pdf') || url.endsWith('.webm')) url = FALLBACK_IMG;
      const fileName = `${place.name.toLowerCase()}_gallery_${j+1}.jpg`;
      const destPath = path.join(galleryDir, fileName);
      await downloadImage(url, destPath);
      galleryPaths.push(`/gallery/${fileName}`);
      await sleep(500);
    }
    
    // Stay (Hotel)
    const hotelUrls = await fetchImagesCommons(`${place.name} hotel`, 1);
    let hotelUrl = hotelUrls[0];
    if (!hotelUrl || hotelUrl.endsWith('.svg') || hotelUrl.endsWith('.pdf')) hotelUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Taj_Connemara_Chennai_03.jpg/800px-Taj_Connemara_Chennai_03.jpg"; // Generic
    const hotelFileName = `${place.name.toLowerCase()}_hotel.jpg`;
    await downloadImage(hotelUrl, path.join(stayDir, hotelFileName));
    await sleep(500);

    // Food (Restaurant)
    const foodUrls = await fetchImagesCommons(`${place.name} food OR restaurant`, 1);
    let foodUrl = foodUrls[0];
    if (!foodUrl || foodUrl.endsWith('.svg') || foodUrl.endsWith('.pdf')) foodUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/South_Indian_Thali.jpg/800px-South_Indian_Thali.jpg"; // Generic
    const foodFileName = `${place.name.toLowerCase()}_food.jpg`;
    await downloadImage(foodUrl, path.join(stayDir, foodFileName));
    await sleep(500);
    
    const originalFileName = `${place.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`;

    mockData.push({
      id: i + 1,
      title: `${place.name} Getaway`,
      image: `/places/${originalFileName}`,
      duration: place.duration,
      price: place.price,
      highlights: place.highlights,
      description: place.desc,
      gallery: [
        `/places/${originalFileName}`,
        ...galleryPaths
      ],
      hotelName: `Premium Lodge in ${place.name}`,
      hotelImage: `/stay/${hotelFileName}`,
      restaurantName: `Authentic ${place.name} Restaurant`,
      restaurantImage: `/stay/${foodFileName}`
    });
  }
  
  const jsContent = `// Auto-generated 30+ places mock data\nexport const mockPackages = ${JSON.stringify(mockData, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'mockPackages.js'), jsContent);
  console.log('Done!');
}

main();
