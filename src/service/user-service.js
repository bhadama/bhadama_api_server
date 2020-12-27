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
    forgotpassword:(payload)=>{
        return new Promise((resolve, reject) => {
        if(!payload){
            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
        }
        userDAO.checkExist(payload.phone_number).then((data)=>{
            if(!data){
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.USER.NOT_REGISTERED})
            }
            else{
                let mailid=data.email;
                let generatedOtp=otp.getRandomString(4);
                let subject="to reset the pin";
                sendMail(mailid,generatedOtp,subject).then((data)=>{
                        myCache.set( payload.phone_number, generatedOtp, 180);
                        resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.SENTMAIL})
                        }).catch(error=>{
                            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR})
                    })
                }
            })
        })
    },
    verifyOtp:(payload)=>{
        return new Promise((resolve, reject) => {
        let cacheValue=myCache.get(payload.phone_number)
        if(!cacheValue){
            reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.USER.OTPEXPIRED})  
        }
        else{
            if(payload.otp==cacheValue){
                resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.OTPSUCESS})
            }
            else{
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.USER.WRONGOTP})
            }
        }
    })
                 
},
    newPin:(payload)=>{
        return new Promise((resolve, reject) => {
        if(!payload.phone_number){
            reject({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
        }
        else{
            userDAO.saveNewPin(payload).then(data=>{
                resolve({ status: constant.HTML_STATUS_CODE.SUCCESS,statusCode: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.USER.PINUPDATED})
            }).catch(error=>{
                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR})
            })
        }
    })
}
}
module.exports = UserService;