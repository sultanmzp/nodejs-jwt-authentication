const mongoose = require('mongoose');

//Create USER Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Create USER MODEL FROM Schema, First parameter is the name of collection, 
const USER = mongoose.model('user', userSchema);

//export the USER Model
module.exports = USER;