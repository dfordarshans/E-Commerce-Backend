const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    category: { type: String, required: true },
    qty:      { type: String, required: true },
    price:    { type: Number, required: true },
    image:    { type: String, default: '' },
    emoji:    { type: String, default: '' },
    inStock:  { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
