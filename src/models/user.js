const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 8,
        maxlength: 65,
        required: true
    },
    age: {
        type: Number,
        min: 15,
        max: 80
    },
    isAdmin: {
        type: Boolean
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;