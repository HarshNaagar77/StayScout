const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL)

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
