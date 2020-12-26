const userDAO = require('./../dao/user-dao');
const constant = require('../utils/constant');

const UserService = {

    //API to signup
    create: (userDetail) => {
        return new Promise((resolve, reject) => {
            if(!userDetail.username || !userDetail.phone_number || !userDetail.email || !userDetail.pin)
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
            userDAO.checkExist(userDetail.phone_number).then((data) => {
                if (data) {
                    reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.USER.USER_ALREADY_REGISTERED });
                } else {
                    userDAO.create(userDetail).then((result) => {
                        // delete result.password;
                        resolve({ message: constant.MESSAGE.USER.CREATED });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                }
            });
        });
    },

}


module.exports = UserService;