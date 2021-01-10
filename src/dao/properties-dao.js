const propertyModel = require('../model/properties-schema');
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
    }
}

module.exports = ProertyDAO;