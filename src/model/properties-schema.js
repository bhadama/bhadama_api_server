const mongoose = require('mongoose');

const constant = require('../utils/constant');
const Schema = mongoose.Schema;

const propertiesSchema = new Schema({
    roomSize: {
        type:String,
        required:true
    },
    roomType: {
        type:String,
        default:''
    },
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    rent: {
        type:Number,
        required:true
    },
    availableFrom: {
        type:Date,
        required:true
    },
    city: {
        type:String,
        default:''
    },
    location: { 
        type: {type: String, default:'Point'},
        coordinates: [{type:String, required:true}]
    },
    place: {
        type:String,
        required:true
    },
    furnishing: {
        type:String,
        required:true
    },
    tenants: {
        type:String,
        required:true
    },
    waterSupplyOther: {
        type:Boolean,
        default:false
    },
    waterSupplyNwscc: {
        type:Boolean,
        default:false
    },
    waterSupplyUnderground: {
        type:Boolean,
        default:false
    },
    twoWheeler:{
        type:Boolean,
        default:false
    },
    fourWheeler: {
        type:Boolean,
        default:false
    },
    images: [{type:String}],
    profileImage:{
        type: String,
        required:true
    },
    advance: {
        type:Number,
        default:0
        
    },
    age: {
        type:String,
        default:''


    },
    facing:{
        type:String,
        default:''
    },
    sqft: {
        type:String,
        default:''
        
    },
    approved: {
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

module.exports = mongoose.model(constant.MODEL_NAME.PROPERTIES, propertiesSchema);



