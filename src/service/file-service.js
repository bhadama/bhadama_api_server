const stockDAO = require('../dao/stock-dao');
const constant = require('../utils/constant');
const S3Manager = require('../utils/s3-manager');
const fileService = {

    uploadFile: (file) => {
        return new Promise((resolve, reject) => {
            // resolve('true');
            
            S3Manager.uploadS3({
                Bucket: constant.S3.bucketName,
                Body: file.buffer,
                Key: `propertyImage_${new Date().getTime()}.png`
              }).then((res) => {
                resolve({data:res.url});
            }).catch((error) => {
                reject({message:error});
            });
        })
    }



}


module.exports = fileService;