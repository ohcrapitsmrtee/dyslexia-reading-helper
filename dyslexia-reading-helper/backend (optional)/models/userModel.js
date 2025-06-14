const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    preferences: {
        textSize: {
            type: Number,
            default: 24 // Default text size for better readability
        },
        theme: {
            type: String,
            default: 'light' // Default theme
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;