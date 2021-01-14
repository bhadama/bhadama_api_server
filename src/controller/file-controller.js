const express = require('express');
const constant = require('./../utils/constant');
const userService = require('./../service/user-service');
const response = require('../utils/custom-response');
const multer = require("multer");
const fileService = require('../service/file-service');

const route = express.Router();

 let multipartMiddleware = multer();

//API to File Upload
route.post('/uploads', multipartMiddleware.single('file'), (req, res) => {
    console.log('req.file  ', req.file.originalname);
    fileService.uploadFile(req.file).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
       res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.statusCode || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message , req: req.file, error}));
    });
});


module.exports = route;