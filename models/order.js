const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true},
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivred', 'cancelled'],
    default: 'pending'
  }
} , { timestamps: true });

// Create a model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order