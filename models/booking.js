const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  service: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],   
    default: 'pending',
  }
}, { timestamps: true });

// Create a model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking