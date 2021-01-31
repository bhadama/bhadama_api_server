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
    count:{
        type:Number,
        default:10
    },
    wishlist:[{
        type: Schema.Types.ObjectId, 
        ref: 'properties'
    }],
    role:{
        type: String,
        enum : constant.ROLE,
        default: 'USER'
    }

},


{
    timestamps: true
});



module.exports = mongoose.model(constant.MODEL_NAME.USER, userSchema); //Compiling schema to model


//find({rent:{$gte:20000,$lt:40000},roomSize:{$gte:1},roomType:"family",city:"kathmandu",
// 'location.coordinates': {
//     '$geoWithin': {
//         '$centerSphere': [[80.60, 26.23], 5/3963.2]
//     }
// }
// })