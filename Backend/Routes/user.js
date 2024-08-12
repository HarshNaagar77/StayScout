const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://naagarharsh70:harsh9311@stayscout.lcgve.mongodb.net/StayScout?retryWrites=true&w=majority';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

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

const User = mongoose.model('User', userSchema);

module.exports = User;
