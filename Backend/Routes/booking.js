const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://naagarharsh70:harsh9311@stayscout.lcgve.mongodb.net/?retryWrites=true&w=majority&appName=StayScout')

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
