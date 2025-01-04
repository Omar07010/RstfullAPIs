const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
}, { timestamps: true });

// Create a model from the schema
const Category = mongoose.model('Category', productSchema);

module.exports = Category