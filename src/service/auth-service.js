const constant = require('./../utils/constant');
const userDAO = require('../dao/user-dao');
const jwt = require('jsonwebtoken');
const AuthService = {
    //API to Login
    signIn: (userDetail) => {
        return new Promise((resolve, reject) => {
            if (!userDetail.phone_number || !userDetail.pin) {
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA });
            }
            userDAO.checkExist(userDetail.phone_number).then((userData) => {
                if (userData) {
                    let isMatched = userDAO.comparePassword(userDetail.pin, userData.pin);
                    if (isMatched) {
                        try {
                            const payLoad = { _id: userData._id, email: userData.email, username: userData.username, address: userData.address };
                            const _token = jwt.sign(payLoad, constant.JWT.SECRET, {
                                expiresIn: constant.JWT.TOKEN_TIMEOUT
                            });
                            delete userData._doc.pin;
                            resolve({
                                message: constant.MESSAGE.USER.LOGIN_SECCESS,
                                accessToken: _token
                            });
                        } catch (error) {
                            reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                        }
                    } else {
                        reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_CREDENTIAL,message: constant.MESSAGE.USER.MESSAGE_INVALID_CREDENTIALS });
                    }

                } else {
                    reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.USER.NOT_REGISTERED });

                }

            }).catch(error => {
                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.USER.INTERNAL_ERROR });


            })


        });
    }
}



module.exports = AuthService;