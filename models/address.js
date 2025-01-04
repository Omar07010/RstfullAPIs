const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  street: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  postalCode: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: Number,
    require: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create a model from the schema
const Address = mongoose.model('Address', addressSchema);

module.exports = Address