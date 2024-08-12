const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://HarshDB123:harsh9311@practicedb.wl8ctoe.mongodb.net/StayScout?retryWrites=true&w=majority&appName=practiceDB')

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
