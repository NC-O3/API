const mongoose = require('mongoose');

const robotInput = mongoose.Schema({
    robotID: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('robotInput', robotInput);