const mongoose = require('mongoose');

const constant = require('../utils/constant');
const Schema = mongoose.Schema;

const propertiesSchema = new Schema({
    roomsize: {
        type:String,
        required:true
    },
    roomtype: {
        type:String,
        required:true
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
        required:true
    },
    location: { 
        type: Object,
        "coordinates": [-73.856077, 40.848447]
    },
    place: {
        type:String,
        required:true
    },
    furnushing: {
        type:String,
        required:true
    },
    tenants: {
        type:String,
        required:true
    },
    watersupply_other: {
        type:Boolean
    },
    watersupply_nwscc: {
        type:Boolean
    },
    watersupply_underground: {
        type:Boolean
    },
    twoWheeler:{
        type:Boolean,
        required:true
    },
    fourWheeler: {
        type:Boolean
    },
    images: {
        type:Array
    },
    profileImage:{
        type:Image,
        required:true
    },
    advance: {
        type:Number,
        required:true
    },
    age: {
        type:String
    },
    facing:{
        type:String,
        required:true
    },
    Sqft: {
        type:String,
        required:true 
    },
    createdAt:{
        type:Date,
        required:true
    },
    updatedAt: {
        type:Date,
        required:true
    },
    approved: {
        default:false
    }
    
})

module.exports = mongoose.model(constant.MODEL_NAME.PROPERTIES, propertiesSchema);