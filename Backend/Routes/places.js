const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://naagarharsh70:harsh9311@stayscout.lcgve.mongodb.net/StayScout?retryWrites=true&w=majority';


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
