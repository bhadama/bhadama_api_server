const propertyDAO = require('../dao/properties-dao');
const constant = require('../utils/constant');
const PropertyService = {
    //API to Create Property
    create: (propertyDetail) => {

        return new Promise((resolve, reject) => {
            if(!propertyDetail.roomSize || !propertyDetail.rent  || !propertyDetail.availableFrom  || !propertyDetail.location || !propertyDetail.place || !propertyDetail.furnishing  || !propertyDetail.tenants  || !propertyDetail.profileImage )
                reject({ status: constant.HTML_STATUS_CODE.SUCCESS, statusCode: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA })
                    propertyDAO.create(propertyDetail).then((result) => {
                        resolve({ message: constant.MESSAGE.PROPERTY.CREATED });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR,statusCode: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                });
    }
    
}
module.exports = PropertyService;