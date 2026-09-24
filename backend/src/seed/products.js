import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Dell XPS 13 Plus",
    description:
      "Ultra-light premium laptop with a 13.4-inch display, fast SSD storage, and all-day battery life for productivity on the go.",
    price: 99990,
    originalPrice: 119990,
    category: "Laptops",
    brand: "Dell",
    images: ["https://images.unsplash.com/..."],
    stock: 18,
    rating: 4.8,
    numReviews: 124,
    featured: true,
    reviews: [
      {
        name: "Aarav",
        rating: 5,
        comment: "Excellent build quality and performance.",
      },
    ],
  },
  {
    name: "Apple MacBook Air M3",
    description:
      "Thin and powerful laptop with advanced performance, exceptionally long battery life, and a stunning Liquid Retina display.",
    price: 119900,
    originalPrice: 139900,
    category: "Laptops",
    brand: "Apple",
    images: ["https://images.unsplash.com/..."],
    stock: 12,
    rating: 4.9,
    numReviews: 96,
    featured: true,
    reviews: [
      { name: "Neha", rating: 5, comment: "Perfect for work and travel." },
    ],
  },
  {
    name: "iPhone 15 Pro Max",
    description:
      "A titanium-frame flagship smartphone with pro camera capabilities, fast performance, and all-day battery power.",
    price: 159900,
    originalPrice: 179900,
    category: "Smartphones",
    brand: "Apple",
    images: ["https://images.unsplash.com/..."],
    stock: 25,
    rating: 4.9,
    numReviews: 214,
    featured: true,
    reviews: [{ name: "Rohit", rating: 5, comment: "Best camera and speed." }],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "High-end Android flagship with a vivid display, powerful camera system, and S Pen support for creators and professionals.",
    price: 134900,
    originalPrice: 154900,
    category: "Smartphones",
    brand: "Samsung",
    images: ["https://images.unsplash.com/..."],
    stock: 22,
    rating: 4.8,
    numReviews: 183,
    featured: true,
    reviews: [
      { name: "Karan", rating: 4, comment: "Great productivity features." },
    ],
  },
  {
    name: "Sony WH-1000XM5",
    description:
      "Premium wireless noise-canceling headphones with immersive sound, AI-enhanced call clarity, and all-day comfort.",
    price: 34990,
    originalPrice: 42990,
    category: "Audio",
    brand: "Sony",
    images: ["https://images.unsplash.com/..."],
    stock: 31,
    rating: 4.8,
    numReviews: 147,
    featured: true,
    reviews: [
      {
        name: "Meera",
        rating: 5,
        comment: "Comfortable and excellent sound quality.",
      },
    ],
  },
  {
    name: "JBL Flip 6",
    description:
      "Portable Bluetooth speaker with deep bass, rugged build, and vibrant sound for home, travel, and outdoor listening.",
    price: 8999,
    originalPrice: 11999,
    category: "Audio",
    brand: "JBL",
    images: ["https://images.unsplash.com/..."],
    stock: 48,
    rating: 4.5,
    numReviews: 94,
    featured: false,
    reviews: [
      { name: "Ishaan", rating: 4, comment: "Great sound for the price." },
    ],
  },
  {
    name: "Mechanical Keyboard Pro",
    description:
      "Compact RGB mechanical keyboard with tactile switches, programmable keys, and durable aluminum frame.",
    price: 6999,
    originalPrice: 8999,
    category: "Keyboards",
    brand: "Zebronics",
    images: ["https://images.unsplash.com/..."],
    stock: 39,
    rating: 4.4,
    numReviews: 76,
    featured: false,
    reviews: [
      { name: "Ananya", rating: 5, comment: "Solid typing experience." },
    ],
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "Ergonomic wireless mouse with ultra-precise tracking, quiet clicks, and multi-device support for efficient workflows.",
    price: 8990,
    originalPrice: 10990,
    category: "Accessories",
    brand: "Logitech",
    images: ["https://images.unsplash.com/..."],
    stock: 58,
    rating: 4.7,
    numReviews: 205,
    featured: false,
    reviews: [
      { name: "Priya", rating: 5, comment: "Smooth and comfortable to use." },
    ],
  },
  {
    name: "Acer Predator X27",
    description:
      "27-inch 4K gaming monitor with HDR brightness, ultra-fast response time, and smooth competitive gameplay performance.",
    price: 89990,
    originalPrice: 109990,
    category: "Monitors",
    brand: "Acer",
    images: ["https://images.unsplash.com/..."],
    stock: 10,
    rating: 4.7,
    numReviews: 58,
    featured: true,
    reviews: [{ name: "Vidit", rating: 5, comment: "Amazing for gaming." }],
  },
  {
    name: "Corsair Vengeance RGB DDR5",
    description:
      "High-speed desktop memory kit designed for performance-focused gaming and content creation builds.",
    price: 14999,
    originalPrice: 17999,
    category: "Storage",
    brand: "Corsair",
    images: ["https://images.unsplash.com/..."],
    stock: 44,
    rating: 4.6,
    numReviews: 88,
    featured: false,
    reviews: [{ name: "Sanjay", rating: 4, comment: "Reliable and fast." }],
  },
  {
    name: "Samsung 980 Pro SSD",
    description:
      "PCIe 4.0 NVMe SSD delivering blistering speeds for gaming rigs and large file editing workflows.",
    price: 10999,
    originalPrice: 14999,
    category: "Storage",
    brand: "Samsung",
    images: ["https://images.unsplash.com/..."],
    stock: 52,
    rating: 4.8,
    numReviews: 112,
    featured: true,
    reviews: [
      { name: "Aditya", rating: 5, comment: "Very fast and dependable." },
    ],
  },
  {
    name: "ASUS ROG Strix G16",
    description:
      "Powerful gaming laptop with RTX graphics, high-refresh display, and strong thermals for intensive modern games.",
    price: 119990,
    originalPrice: 149990,
    category: "Gaming",
    brand: "ASUS",
    images: ["https://images.unsplash.com/..."],
    stock: 15,
    rating: 4.7,
    numReviews: 133,
    featured: true,
    reviews: [
      {
        name: "Harsh",
        rating: 5,
        comment: "Great performance for gaming and streaming.",
      },
    ],
  },
  {
    name: "Apple MagSafe Charger",
    description:
      "Fast and convenient magnetic charging accessory for Apple devices with clean cable management.",
    price: 3999,
    originalPrice: 4999,
    category: "Accessories",
    brand: "Apple",
    images: ["https://images.unsplash.com/..."],
    stock: 66,
    rating: 4.5,
    numReviews: 81,
    featured: false,
    reviews: [{ name: "Nikita", rating: 4, comment: "Simple and reliable." }],
  },
  {
    name: "Noise Cancelling Earbuds Pro",
    description:
      "Compact wireless earbuds with deep bass, adaptive ANC, and durable battery for everyday listening.",
    price: 5499,
    originalPrice: 7999,
    category: "Audio",
    brand: "Boat",
    images: ["https://images.unsplash.com/..."],
    stock: 70,
    rating: 4.3,
    numReviews: 101,
    featured: false,
    reviews: [
      { name: "Ritika", rating: 4, comment: "Good daily-use earbuds." },
    ],
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/electrohub",
    );
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`Seeded ${inserted.length} products into MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seedProducts();
