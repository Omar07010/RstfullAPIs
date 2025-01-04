const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  payMethod: {
    type: String,
    require: true,
    enum: ['credit_card', 'paypal', 'cash_on_delivery']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    require: true
  }
} , { timestamps: true });

// Create a model from the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment