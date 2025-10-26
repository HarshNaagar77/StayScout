const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harsh9311:harsh9311@cluster0.u3vjpvv.mongodb.net/?appName=Cluster0')

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