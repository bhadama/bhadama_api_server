const express = require('express');
const constant = require('../utils/constant');
const propertyService = require('../service/properties-service');
const response = require('../utils/custom-response');
const route = express.Router();

//API to Create Property
route.post('/', (req, res) => {
    console.log('req.body', req.body);
    propertyService.create(req.body).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
       res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    });
});


module.exports = route;


