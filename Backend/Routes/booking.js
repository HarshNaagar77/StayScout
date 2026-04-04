const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL)

const bookingSchema = new mongoose.Schema({
  checkIn: String, 
  checkOut: String,
  name: String, 
  phone: Number, 
  guest: Number, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },

});


module.exports = mongoose.model('Booking', bookingSchema);
