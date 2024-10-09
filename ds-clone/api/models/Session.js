const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },

    jwt: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Session', sessionSchema);