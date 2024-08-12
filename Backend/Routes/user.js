const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://HarshDB123:harsh9311@practicedb.wl8ctoe.mongodb.net/StayScout?retryWrites=true&w=majority&appName=practiceDB')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    place: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'places'
      }],
});

const user = mongoose.model('user', userSchema);

module.exports = user;