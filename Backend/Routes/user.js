const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StayScout')

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
});

const user = mongoose.model('user', userSchema);

module.exports = user;