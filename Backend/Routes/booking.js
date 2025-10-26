const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harsh9311:harsh9311@cluster0.u3vjpvv.mongodb.net/?appName=Cluster0')

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
