const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harsh9311:harsh9311@cluster0.u3vjpvv.mongodb.net/?appName=Cluster0')

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
