const mongo = require('mongoose');

const schemaUser = new mongoose.Schema({
    name: String, 
    email: String,
    statusUser: {
        type: Boolean,
        default: false,
    },
    dateCreate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongo.model('User', schemaUser);