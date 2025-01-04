const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    require: true
  },
  rating: {
    type: Number,
    require: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  reports: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Create a model from the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review