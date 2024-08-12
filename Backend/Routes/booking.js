const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://naagarharsh70:harsh9311@stayscout.lcgve.mongodb.net/StayScout?retryWrites=true&w=majority';



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
