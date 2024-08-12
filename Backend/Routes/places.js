const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://HarshDB123:harsh9311@practicedb.wl8ctoe.mongodb.net/StayScout?retryWrites=true&w=majority&appName=practiceDB')

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
