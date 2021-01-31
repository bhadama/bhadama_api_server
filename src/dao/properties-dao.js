const propertyModel = require('../model/properties-schema');
const userModel = require('../model/users-schema');
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
    
    getByCondition: async(query) => {
        // {rent:{$gte:20000,$lt:40000},roomSize:{$gte:1},roomType:"family",city:"kathmandu",
// 'location.coordinates': {
//     '$geoWithin': {
//         '$centerSphere': [[80.60, 26.23], 5/3963.2]
//     }
// }
// }
    let condition = {};
    if(query){
        if(query.roomSize)
        condition['roomSize'] = {'$in':query.roomSize};
    if(query.city)
        condition['city'] = query.city;
    if(query.rent)
        condition['rent'] = {'$gte':query.rent.min, '$lte':query.rent.max}
    if(query.roomType)
        condition['roomType'] = {'$in':query.roomType};
    if(query.location){
        condition['location.coordinates'] ={
                '$geoWithin': {
                    '$centerSphere': [[query.location.coordinates[0], query.location.coordinates[1]], 5/3963.2]
                }
        }
    }
    }    
       let result =  await propertyModel.find(condition);
       if(result.length==0){
        condition['location.coordinates'] ={
            '$geoWithin': {
                '$centerSphere': [[query.location.coordinates[0], query.location.coordinates[1]], 10/3963.2]
            }
    }
        let result = await propertyModel.find(condition);
        return result;
       }else{
           return result;
       }
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
    addToWishlist: (userId, id ) => {
        console.log('userId, propertyId-', userId, id);
        return userModel.updateOne({_id:userId}, {$addToSet: { wishlist: id } });
    },
    removeFromWishlist: (userId, id ) => {
        console.log('userId, propertyId-', userId, id);
        return userModel.updateOne({_id:userId}, {$pull: { wishlist: id } });
    },
}

module.exports = ProertyDAO;