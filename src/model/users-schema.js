const mongoose = require('mongoose');

const constant = require('../utils/constant');
const Schema = mongoose.Schema;

// Create Schema objects for User
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required:true
    },
    phone_number: {
        type: String,
        trim: true,
        required:true

    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        trim: true
    },

}, {
    timestamps: true
});



module.exports = mongoose.model(constant.MODEL_NAME.USER, userSchema); //Compiling schema to model