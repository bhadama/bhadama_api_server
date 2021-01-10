const propertyDAO = require('../dao/properties-dao');
const constant = require('../utils/constant');
const PropertyService = {
    //API to Create Property
    create: (userId,propertyDetail) => {

        return new Promise((resolve, reject) => {
            if(!propertyDetail.roomSize || !propertyDetail.rent  || !propertyDetail.availableFrom  || !propertyDetail.location || !propertyDetail.place || !propertyDetail.hasOwnProperty('furnishing')  || !propertyDetail.tenants)
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
                    propertyDAO.create(userId,propertyDetail).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.CREATED });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    },
    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
                 propertyDAO.getByUserId(userId).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.DATA_FOUND, data:result });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    }

    
    
}
module.exports = PropertyService;