require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./Models/ProductModel');

const products = [
  { name: 'Fresh Strawberry',  category: 'Fruits',     qty: '1 Kg',     price: 500, emoji: '🍓' },
  { name: 'Ripe Bananas',      category: 'Fruits',     qty: '1 Dozen',  price: 80,  emoji: '🍌' },
  { name: 'Red Apples',        category: 'Fruits',     qty: '1 Kg',     price: 160, emoji: '🍎' },
  { name: 'Sweet Mango',       category: 'Fruits',     qty: '1 Kg',     price: 120, emoji: '🥭' },
  { name: 'Watermelon',        category: 'Fruits',     qty: '1 piece',  price: 80,  emoji: '🍉' },
  { name: 'Grapes',            category: 'Fruits',     qty: '500 g',    price: 90,  emoji: '🍇' },
  { name: 'Orange',            category: 'Fruits',     qty: '1 Kg',     price: 100, emoji: '🍊' },
  { name: 'Pineapple',         category: 'Fruits',     qty: '1 piece',  price: 70,  emoji: '🍍' },
  { name: 'Kiwi',              category: 'Fruits',     qty: '6 pieces', price: 180, emoji: '🥝' },
  { name: 'Pomegranate',       category: 'Fruits',     qty: '2 pieces', price: 140, emoji: '🍑' },
  { name: 'Papaya',            category: 'Fruits',     qty: '1 Kg',     price: 60,  emoji: '🧡' },
  { name: 'Guava',             category: 'Fruits',     qty: '500 g',    price: 50,  emoji: '🍈' },

  { name: 'Fresh Carrots',     category: 'Vegetables', qty: '500 g',    price: 60,  emoji: '🥕' },
  { name: 'Spinach Bunch',     category: 'Vegetables', qty: '250 g',    price: 30,  emoji: '🥬' },
  { name: 'Broccoli',          category: 'Vegetables', qty: '500 g',    price: 80,  emoji: '🥦' },
  { name: 'Tomatoes',          category: 'Vegetables', qty: '500 g',    price: 40,  emoji: '🍅' },
  { name: 'Onions',            category: 'Vegetables', qty: '1 Kg',     price: 35,  emoji: '🧅' },
  { name: 'Bell Peppers',      category: 'Vegetables', qty: '500 g',    price: 90,  emoji: '🫑' },
  { name: 'Potatoes',          category: 'Vegetables', qty: '1 Kg',     price: 40,  emoji: '🥔' },
  { name: 'Cucumber',          category: 'Vegetables', qty: '500 g',    price: 30,  emoji: '🥒' },
  { name: 'Cauliflower',       category: 'Vegetables', qty: '1 piece',  price: 45,  emoji: '🥦' },
  { name: 'Garlic',            category: 'Vegetables', qty: '250 g',    price: 55,  emoji: '🧄' },
  { name: 'Green Peas',        category: 'Vegetables', qty: '500 g',    price: 65,  emoji: '🫛' },
  { name: 'Eggplant',          category: 'Vegetables', qty: '500 g',    price: 40,  emoji: '🍆' },
  { name: 'Sweet Corn',        category: 'Vegetables', qty: '3 pieces', price: 50,  emoji: '🌽' },
  { name: 'Lady Finger',       category: 'Vegetables', qty: '500 g',    price: 35,  emoji: '🌿' },
  { name: 'Ginger',            category: 'Vegetables', qty: '250 g',    price: 45,  emoji: '🫚' },
  { name: 'Lettuce',           category: 'Vegetables', qty: '1 head',   price: 55,  emoji: '🥗' },

  { name: 'Full Cream Milk',   category: 'Dairy',      qty: '1 Litre',  price: 65,  emoji: '🥛' },
  { name: 'Cheddar Cheese',    category: 'Dairy',      qty: '200 g',    price: 180, emoji: '🧀' },
  { name: 'Greek Yogurt',      category: 'Dairy',      qty: '400 g',    price: 90,  emoji: '🍶' },
  { name: 'Butter',            category: 'Dairy',      qty: '100 g',    price: 55,  emoji: '🧈' },
  { name: 'Paneer',            category: 'Dairy',      qty: '200 g',    price: 95,  emoji: '🍳' },
  { name: 'Cream Cheese',      category: 'Dairy',      qty: '200 g',    price: 160, emoji: '🧀' },
  { name: 'Skimmed Milk',      category: 'Dairy',      qty: '1 Litre',  price: 58,  emoji: '🥛' },
  { name: 'Whipping Cream',    category: 'Dairy',      qty: '200 ml',   price: 120, emoji: '🍦' },
  { name: 'Mozzarella',        category: 'Dairy',      qty: '200 g',    price: 200, emoji: '🍕' },
  { name: 'Flavoured Lassi',   category: 'Dairy',      qty: '500 ml',   price: 70,  emoji: '🥤' },

  { name: 'Organic Peanuts',   category: 'Snacks',     qty: '1 Kg',     price: 200, emoji: '🥜' },
  { name: 'Potato Chips',      category: 'Snacks',     qty: '100 g',    price: 40,  emoji: '🍟' },
  { name: 'Mixed Nuts',        category: 'Snacks',     qty: '500 g',    price: 350, emoji: '🌰' },
  { name: 'Dark Chocolate',    category: 'Snacks',     qty: '100 g',    price: 120, emoji: '🍫' },
  { name: 'Granola Bar',       category: 'Snacks',     qty: '6 bars',   price: 180, emoji: '🍫' },
  { name: 'Cashews',           category: 'Snacks',     qty: '250 g',    price: 280, emoji: '🥜' },
  { name: 'Almonds',           category: 'Snacks',     qty: '250 g',    price: 320, emoji: '🌰' },
  { name: 'Popcorn',           category: 'Snacks',     qty: '150 g',    price: 60,  emoji: '🍿' },
  { name: 'Biscuits',          category: 'Snacks',     qty: '200 g',    price: 50,  emoji: '🍪' },
  { name: 'Trail Mix',         category: 'Snacks',     qty: '400 g',    price: 220, emoji: '🥗' },
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products to MongoDB Atlas`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  });
