const propertyModel = require('../model/properties-schema');
const mongoose = require('mongoose');
const ProertyDAO = {
    create: (userId, propertyDetail) => {
        console.log('req.body inside dao--', propertyDetail,userId)
        return new propertyModel({
            ...propertyDetail,
            userId: userId
        }).save();
    },
    getByUserId: (userId) => {
        return propertyModel.find({ userId });
    },
    comparePassword: (reqPassword, UserPassword) => {
        return reqPassword == UserPassword;
    },
    getById: (data) => {
        return userModel.findOne({ _id: data });
    },
    saveNewPin:(data)=>{
        return  userModel.updateOne({phone_number:data.phone_number},{$set:{pin:data.pin}})
    },
    updateByPropertyId: (propertyId, userId, updateData ) => {
        console.log('propertyId-', propertyId,userId, updateData);
        return propertyModel.updateOne({_id:propertyId, userId:userId}, {$set:updateData});
    },
    getByPropertyId: (propertyId)=>{
        return propertyModel.findOne({_id:propertyId});
    },
    deleteByPropertyId: (propertyId, userId, updateData ) => {
        console.log('propertyId-', propertyId,userId, updateData);
        return propertyModel.deleteOne({_id:propertyId, userId:userId});
    },
}

module.exports = ProertyDAO;