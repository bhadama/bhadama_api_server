const express = require('express');
const route = express.Router();

const constant = require('./../utils/constant');
const authService = require('./../service/auth-service');
const response = require('../utils/custom-response');

//API to login
route.post('/', (req, res) => {
    authService.signIn(req.body).then((result) => {
        console.log('login req.payload in auth',req.body);
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode, { message: error.message }));
    })
});



module.exports = route;