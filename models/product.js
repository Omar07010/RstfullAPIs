const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  stock: {
    type: Number,
    default: 0
  },
  isFeatured : {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    require: true
  }
} , { timestamps: true });

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product