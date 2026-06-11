require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./Models/ProductModel');

const products = [
  // ── FRUITS ──
  { name: 'Fresh Strawberry',  category: 'Fruits',     qty: '1 Kg',     price: 500, emoji: '🍓', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80' },
  { name: 'Ripe Bananas',      category: 'Fruits',     qty: '1 Dozen',  price: 80,  emoji: '🍌', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80' },
  { name: 'Red Apples',        category: 'Fruits',     qty: '1 Kg',     price: 160, emoji: '🍎', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80' },
  { name: 'Sweet Mango',       category: 'Fruits',     qty: '1 Kg',     price: 120, emoji: '🥭', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80' },
  { name: 'Watermelon',        category: 'Fruits',     qty: '1 piece',  price: 80,  emoji: '🍉', image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&q=80' },
  { name: 'Grapes',            category: 'Fruits',     qty: '500 g',    price: 90,  emoji: '🍇', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80' },
  { name: 'Orange',            category: 'Fruits',     qty: '1 Kg',     price: 100, emoji: '🍊', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80' },
  { name: 'Pineapple',         category: 'Fruits',     qty: '1 piece',  price: 70,  emoji: '🍍', image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&q=80' },
  { name: 'Kiwi',              category: 'Fruits',     qty: '6 pieces', price: 180, emoji: '🥝', image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&q=80' },
  { name: 'Pomegranate',       category: 'Fruits',     qty: '2 pieces', price: 140, emoji: '🍑', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80' },
  { name: 'Papaya',            category: 'Fruits',     qty: '1 Kg',     price: 60,  emoji: '🧡', image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&q=80' },
  { name: 'Guava',             category: 'Fruits',     qty: '500 g',    price: 50,  emoji: '🍈', image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&q=80' },

  // ── VEGETABLES ──
  { name: 'Fresh Carrots',     category: 'Vegetables', qty: '500 g',    price: 60,  emoji: '🥕', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80' },
  { name: 'Spinach Bunch',     category: 'Vegetables', qty: '250 g',    price: 30,  emoji: '🥬', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80' },
  { name: 'Broccoli',          category: 'Vegetables', qty: '500 g',    price: 80,  emoji: '🥦', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80' },
  { name: 'Tomatoes',          category: 'Vegetables', qty: '500 g',    price: 40,  emoji: '🍅', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&q=80' },
  { name: 'Onions',            category: 'Vegetables', qty: '1 Kg',     price: 35,  emoji: '🧅', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80' },
  { name: 'Bell Peppers',      category: 'Vegetables', qty: '500 g',    price: 90,  emoji: '🫑', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80' },
  { name: 'Potatoes',          category: 'Vegetables', qty: '1 Kg',     price: 40,  emoji: '🥔', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80' },
  { name: 'Cucumber',          category: 'Vegetables', qty: '500 g',    price: 30,  emoji: '🥒', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&q=80' },
  { name: 'Cauliflower',       category: 'Vegetables', qty: '1 piece',  price: 45,  emoji: '🥦', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&q=80' },
  { name: 'Garlic',            category: 'Vegetables', qty: '250 g',    price: 55,  emoji: '🧄', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&q=80' },
  { name: 'Green Peas',        category: 'Vegetables', qty: '500 g',    price: 65,  emoji: '🟢', image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&q=80' },
  { name: 'Eggplant',          category: 'Vegetables', qty: '500 g',    price: 40,  emoji: '🍆', image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=80' },
  { name: 'Sweet Corn',        category: 'Vegetables', qty: '3 pieces', price: 50,  emoji: '🌽', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80' },
  { name: 'Lady Finger',       category: 'Vegetables', qty: '500 g',    price: 35,  emoji: '🌿', image: 'https://images.unsplash.com/photo-1627916607278-e23d2261a1ef?w=400&q=80' },
  { name: 'Ginger',            category: 'Vegetables', qty: '250 g',    price: 45,  emoji: '🫚', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80' },
  { name: 'Lettuce',           category: 'Vegetables', qty: '1 head',   price: 55,  emoji: '🥗', image: 'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=400&q=80' },

  // ── DAIRY ──
  { name: 'Full Cream Milk',   category: 'Dairy',      qty: '1 Litre',  price: 65,  emoji: '🥛', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80' },
  { name: 'Cheddar Cheese',    category: 'Dairy',      qty: '200 g',    price: 180, emoji: '🧀', image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400&q=80' },
  { name: 'Greek Yogurt',      category: 'Dairy',      qty: '400 g',    price: 90,  emoji: '🍶', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
  { name: 'Butter',            category: 'Dairy',      qty: '100 g',    price: 55,  emoji: '🧈', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80' },
  { name: 'Paneer',            category: 'Dairy',      qty: '200 g',    price: 95,  emoji: '🍳', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80' },
  { name: 'Cream Cheese',      category: 'Dairy',      qty: '200 g',    price: 160, emoji: '🧀', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80' },
  { name: 'Skimmed Milk',      category: 'Dairy',      qty: '1 Litre',  price: 58,  emoji: '🥛', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80' },
  { name: 'Whipping Cream',    category: 'Dairy',      qty: '200 ml',   price: 120, emoji: '🍦', image: 'https://images.unsplash.com/photo-1559181567-c3190bfbf325?w=400&q=80' },
  { name: 'Mozzarella',        category: 'Dairy',      qty: '200 g',    price: 200, emoji: '🍕', image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=400&q=80' },
  { name: 'Flavoured Lassi',   category: 'Dairy',      qty: '500 ml',   price: 70,  emoji: '🥤', image: 'https://images.unsplash.com/photo-1571167160783-9cde2e5e2f8d?w=400&q=80' },

  // ── SNACKS ──
  { name: 'Organic Peanuts',   category: 'Snacks',     qty: '1 Kg',     price: 200, emoji: '🥜', image: 'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=400&q=80' },
  { name: 'Potato Chips',      category: 'Snacks',     qty: '100 g',    price: 40,  emoji: '🍟', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
  { name: 'Mixed Nuts',        category: 'Snacks',     qty: '500 g',    price: 350, emoji: '🌰', image: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=400&q=80' },
  { name: 'Dark Chocolate',    category: 'Snacks',     qty: '100 g',    price: 120, emoji: '🍫', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
  { name: 'Granola Bar',       category: 'Snacks',     qty: '6 bars',   price: 180, emoji: '🍫', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80' },
  { name: 'Cashews',           category: 'Snacks',     qty: '250 g',    price: 280, emoji: '🥜', image: 'https://images.unsplash.com/photo-1604940839709-cc81dbbf5d80?w=400&q=80' },
  { name: 'Almonds',           category: 'Snacks',     qty: '250 g',    price: 320, emoji: '🌰', image: 'https://images.unsplash.com/photo-1574570173583-e0c3c0671fc1?w=400&q=80' },
  { name: 'Popcorn',           category: 'Snacks',     qty: '150 g',    price: 60,  emoji: '🍿', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&q=80' },
  { name: 'Biscuits',          category: 'Snacks',     qty: '200 g',    price: 50,  emoji: '🍪', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
  { name: 'Trail Mix',         category: 'Snacks',     qty: '400 g',    price: 220, emoji: '🥗', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&q=80' },
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products with images`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  });
