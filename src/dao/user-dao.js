const userModel = require('../model/users-schema');
const utility = require('../utils/utilities');
const UserDAO = {
    create: (userDetail) => {
        return new userModel({
            username: userDetail.username,
            email: userDetail.email,
            address: userDetail.address,
            pin: userDetail.pin,
            phone_number:userDetail.phone_number
        }).save();
    },
    checkExist: (phone_number) => {
        return userModel.findOne({ phone_number });
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
    getWishlistProperty: (userId) => {
        return userModel.find({ _id:userId },{wishlist:1, _id:0}).populate('wishlist');
    },
}

module.exports = UserDAO;