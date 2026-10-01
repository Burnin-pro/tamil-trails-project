# 🌴 Tamil Trails - Premium Tour Planner & Booking Platform

![Tamil Trails Logo](https://files.catbox.moe/8w7yst.png)

**Tamil Trails** is a full-stack, premium web application designed to showcase and book curated travel experiences across Tamil Nadu, India. Featuring a highly responsive, modern UI with smooth animations, robust backend APIs, and automated email notifications, it provides an end-to-end booking experience for tourists.

---

## ✨ Key Features

### 🎨 Frontend (Client Application)
- **Premium User Interface:** Built with React, Tailwind CSS, and Framer Motion for a stunning, glassmorphism-inspired, and highly interactive user experience.
- **Dynamic Package Browsing:** View over 30+ highly detailed tourist packages (Ooty, Kodaikanal, Mahabalipuram, etc.) complete with authentic, high-resolution imagery.
- **Advanced Search & Filtering:** Filter destinations by name, price tiers (Under ₹10,000, ₹10k-20k, Above ₹20k), and view them through a clean, paginated grid (9 packages per page).
- **Detailed Itineraries:** Each package features a beautifully tabbed details page containing day-by-day itineraries, immersive image galleries, and local hotel/cuisine showcases.
- **Seamless Booking System:** A completely functional "Book Now" contact form that connects directly to the backend API.

### ⚙️ Backend (Server API)
- **RESTful API:** Built on Node.js and Express to securely handle all data fetching and form submissions.
- **MongoDB Database:** Utilizes Mongoose models to strictly define schemas for Packages, Testimonials, and Contact Messages.
- **Automated Email Service:** Integrated with `nodemailer` to send stunning, automated HTML emails. 
  - **For Users:** Sends a beautiful "Your Journey Begins Here" branded confirmation email.
  - **For Owners:** Sends an instant "Hot New Lead 🚀" alert containing the customer's phone number and requested package for immediate callback.
- **Database Seeding Scripts:** Built-in seed scripts (`seedPackages.js`, `seedTestimonials.js`) to quickly populate or reset the database with rich mock data.

---

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS (Utility-first styling)
- Framer Motion (Advanced animations)
- React Router DOM (Navigation)
- Axios (API Client)
- React Icons

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Nodemailer (Email automation)
- Express Validator (Security & input validation)
- Dotenv (Environment variable management)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

### 1. Installation

Clone the repository and install the dependencies for both the frontend and backend.

\`\`\`bash
# Install Backend Dependencies
cd "tourist planner/server"
npm install

# Install Frontend Dependencies
cd "../tamil-trails"
npm install
\`\`\`

### 2. Environment Variables

Navigate to the `server` directory and create a `.env` file with the following variables:

\`\`\`env
# Database
MONGO_URI="your_mongodb_connection_string"

# Server
PORT=5000
CORS_ORIGIN=http://localhost:5173

# Email Automation (Gmail App Password Required)
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_16_digit_app_password"
\`\`\`

### 3. Database Seeding

To populate your MongoDB database with the 32+ curated travel packages and images:

\`\`\`bash
cd server
npm run seed
\`\`\`

### 4. Running the Application

You need two terminal windows to run both the frontend and the backend simultaneously.

**Terminal 1 (Backend):**
\`\`\`bash
cd server
npm run dev
# Server running in development mode on port 5000
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
cd tamil-trails
npm run dev
# VITE ready in... Local: http://localhost:5173/
\`\`\`

---

## 📂 Project Structure

\`\`\`text
tourist planner/
├── server/                   # Node.js Express Backend
│   ├── controllers/          # API route logic (packages, contact)
│   ├── models/               # MongoDB schemas (Package.js, ContactMessage.js)
│   ├── routes/               # Express route definitions
│   ├── seed/                 # Database population scripts
│   ├── utils/                # Helper functions (emailService.js)
│   └── server.js             # Main backend entry point
│
├── tamil-trails/             # React Frontend
│   ├── public/               # Static assets & images (places, packages)
│   ├── src/
│   │   ├── api/              # Axios client configurations
│   │   ├── components/       # Reusable UI (Navbar, Cards, Forms)
│   │   ├── data/             # Static mock data fallbacks
│   │   ├── pages/            # Main views (Home, Packages, PackageDetails)
│   │   ├── App.jsx           # React Router configuration
│   │   └── index.css         # Tailwind directives and custom fonts
│   ├── vite.config.js
│   └── package.json
│
└── tamil-trails-admin/       # React Admin Dashboard (Optional)
\`\`\`

---

## 👨‍💻 Author & Credits

Developed and designed for **Tamil Trails**. Images are sourced from Unsplash, Wikimedia, and LoremFlickr. Built with modern web development standards and optimized for performance and aesthetic appeal.
