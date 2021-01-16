const propertyDAO = require('../dao/properties-dao');
const constant = require('../utils/constant');
const PropertyService = {
    //API to Create Property
    create: (userId,propertyDetail) => {

        return new Promise((resolve, reject) => {
            if(!propertyDetail.roomSize || !propertyDetail.rent  || !propertyDetail.availableFrom  || !propertyDetail.location || !propertyDetail.place || !propertyDetail.hasOwnProperty('furnishing')  || !propertyDetail.tenants)
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
                    propertyDAO.create(userId,propertyDetail).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.CREATED , id: result._id});
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
    },
    updateByPropertyId: (propertyId, userId, updateData) => {
        return new Promise((resolve, reject) => {
                 
                 propertyDAO.updateByPropertyId(propertyId, userId, updateData).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.UPDATED, data:result });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    },
    
    getByPropertyId: (propertyId) => {
        return new Promise((resolve, reject) => {
                 propertyDAO.getByPropertyId(propertyId).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.DATA_FOUND, data:result });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    },
    deleteByPropertyId: (propertyId, userId) => {
        return new Promise((resolve, reject) => {
                 
                 propertyDAO.deleteByPropertyId(propertyId, userId).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.DELETED, data:result });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    },
    

    
    
}
module.exports = PropertyService;