const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StayScout')

const placesSchema = new mongoose.Schema({
    title : String,
    description : String,
    location : String,
    services : String ,
    price : Number,
    category : String ,
    checkIn : String ,
    checkOut : String,
    image : [String],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }],
});

const places = mongoose.model('places', placesSchema);

module.exports = places;