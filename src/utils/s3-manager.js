const AWS = require('aws-sdk');
const constant = require('./constant');

AWS.config.update(constant.S3.credential);

var s3 = new AWS.S3({
    params: {
        Bucket: constant.S3.bucketName
    },
    region: 'us-east-2'
});

const S3Manager = {
    uploadS3:(params)=> {
        return new Promise((resolve, reject) => {
            if (params.Key && params.Body) {
                s3.putObject(params, (err, data) => {
                    if (err) {
                     console.log("Error uploading image: ", err);
                        reject(err);
                    } else {
                        console.log("Successfully uploaded image on S3", data);
                         data.url = constant.S3.baseUrl + '/' + params.Key;
                        resolve(data);
                    }
                });
            } else {
                reject(new ErrorResponse(constants.HTTP_STATUS_NOT_ACCEPTABLE, constants.MESSAGE_INVALID_DATA));
            }
        });
    }
}


module.exports = S3Manager;