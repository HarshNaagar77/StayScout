const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StayScout')

const placeSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  price: Number,
  guest: Number,
  services: [String],
  images: [String],  // Updated to handle an array of image filenames
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  checkIn: String,
  checkOut: String,
  additional: [String]
});

module.exports = mongoose.model('Place', placeSchema);
