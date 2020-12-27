const express = require('express');
const constant = require('./../utils/constant');
const userService = require('./../service/user-service');
const response = require('../utils/custom-response');
const route = express.Router();

//API to signup
route.post('/', (req, res) => {
    userService.create(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
       res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    });
});

//API to forgotpassword
route.post('/forgotPassword', (req, res) => {
    userService.forgotPassword(req.body).then((result) => {
        console.log('user controller - forgot password repsonse', result);
       res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
        console.log('user controller - forgot password Error', error);

        res.status(error.status || constant.HTML_STATUS_CODE.SUCCESS).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    });
});

route.post('/verifyOTP', (req, res) => {

    userService.verifyOTP(req.body).then((result) => {
        console.log('user controller - verifyOTP repsonse', result);

       res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
        console.log('user controller - verifyOTP error', error);

        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    });
});

route.put('/setNewPin', (req, res) => {
    userService.setNewPin(req.body).then((result) => {
        console.log('user controller - setNewPin repsonse', result);

        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
        console.log('user controller - setNewPin error', error);

        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    });
});

module.exports = route;