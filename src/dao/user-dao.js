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
    }
}

module.exports = UserDAO;