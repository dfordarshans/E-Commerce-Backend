const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  qty:       { type: String },
  image:     { type: String },
  emoji:     { type: String },
  count:     { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String },
    email:    { type: String },
    items:    [OrderItemSchema],
    total:    { type: Number, required: true },
    delivery: { type: Number, default: 0 },
    status:   { type: String, default: 'Placed', enum: ['Placed', 'Processing', 'Delivered', 'Cancelled'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
