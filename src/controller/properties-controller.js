const express = require('express');
const constant = require('../utils/constant');
const propertyService = require('../service/properties-service');
const response = require('../utils/custom-response');
const route = express.Router();
const isAuthenticate = require('../service/token-service');

//API to Create Property
route.post('/',isAuthenticate, (req, res) => {
    console.log('req.body', req.body);
    propertyService.create(req.user._id,req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
       res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message, req:{headers:req.headers,body:req.body} }));
    });
});

route.get('/', isAuthenticate, (req, res) => {
    // let propertyId= req.params.propertyId;
    // if(!propertyId)
    //    res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.error(constant.HTML_STATUS_CODE.INVALID_DATA || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: constant.MESSAGE.COMMON.INVALID_PARAMS }));
    propertyService.getByUserId(req.user._id).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
       res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message,req:{headers:req.headers,body:req.body} }));
    });
});


module.exports = route;


