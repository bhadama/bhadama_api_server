const userDAO = require('./../dao/user-dao');
const constant = require('../utils/constant');
const sendMail = require('../utils/email');
const otp = require('../utils/utilities');

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public')) // to integrate the static pages

let NodeCache = require( "node-cache" );
let myCache = new NodeCache({deleteOnExpire:true});

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
    forgotPassword:(payload)=>{
        return new Promise((resolve, reject) => {
            console.log('payload inside userService--', payload);
        if(!payload){
            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
        }
        userDAO.checkExist(payload.phone_number).then((data)=>{
            console.log('data inside user Exist--', payload);

            if(!data){
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.USER.NOT_REGISTERED})
            }
            else{
                let mailid=data.email;
                let generatedOtp=otp.getRandomString(4);
                let subject="Otp for reset pin";
                sendMail(mailid,generatedOtp,subject).then((data)=>{
                    console.log('Sending mail userService--', data);

                        myCache.set( payload.phone_number, generatedOtp, 300);
                        console.log('cache set data ', myCache.get(payload.phone_number));
                        resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.SENTMAIL})
                        }).catch(error=>{
                            console.log('error in user service for sending mail/cache --', error);
                            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR})
                    })
                }
            })
        })
    },
    verifyOTP:(payload)=>{
        console.log('payload inside verifyOTP userService--', payload);

        return new Promise((resolve, reject) => {
        let cacheValue=myCache.get(payload.phone_number);
        console.log('cache  inside verifyOTP userService--', cacheValue);

        if(!cacheValue){
            reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.USER.OTPEXPIRED})  
        }
        else{
            if(payload.otp == cacheValue){
                resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.OTPSUCESS})
            }
            else{
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.USER.WRONGOTP})
            }
        }
    })
                 
},
    setNewPin: (payload)=>{
        console.log('payload inside setNewPin userService--', payload);
        
        return new Promise((resolve, reject) => {
        if(!payload.phone_number){
            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
        }
        if(!payload.pin){
            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
        }
        else{
            userDAO.saveNewPin(payload).then(data=>{
                console.log('data inside setNewPin userService--', data);

                resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.PINUPDATED})
            }).catch(error=>{
                console.log('error inside setNewPin userService--', error);

                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR})
            })
        }
    })
}
}
module.exports = UserService;