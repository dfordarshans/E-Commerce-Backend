require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Models/UserModels');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    const email = 'admin@gmail.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('⚠️  Admin user already exists');
      process.exit(0);
    }
    const password = await bcrypt.hash('Admin@123', 10);
    await User.create({ firstname: 'Admin', lastname: 'GrocerGo', email, phone: '9000000000', password });
    console.log('✅ Admin user created');
    console.log('   Email   : admin@gmail.com');
    console.log('   Password: Admin@123');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  });
