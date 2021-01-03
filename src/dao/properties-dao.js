const propertyModel = require('../model/properties-schema');
const ProertyDAO = {
    create: (userId, propertyDetail) => {
        return new propertyModel({
            roomSize: propertyDetail.roomSize, 
            roomType:  propertyDetail.roomType,
            rent:propertyDetail.rent,
            availableFrom: propertyDetail.availableFrom,
            city:  propertyDetail.city,
            location: propertyDetail.location,
            place:  propertyDetail.place,
            furnishing: propertyDetail.furnishing,
            tenants:  propertyDetail.tenants,
            waterSupplyOther:propertyDetail.waterSupplyOther,
            waterSupplyNwscc:propertyDetail.waterSupplyNwscc,
            waterSupplyUnderground:propertyDetail.waterSupplyUnderground,
            twoWheeler:propertyDetail.twoWheeler,
            fourWheeler: propertyDetail.fourWheeler,
            images: propertyDetail.images,
            profileImage:propertyDetail.profileImage,
            advance: propertyDetail.advance,
            age: propertyDetail.age,
            facing:propertyDetail.facing,
            sqft: propertyDetail.sqft,
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
    }
}

module.exports = ProertyDAO;