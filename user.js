const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }

});

module.exports = mongoose.model('user', user);