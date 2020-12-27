const constant = {
    MONGO_URI: 'mongodb://localhost:27017/bhadama',
    PORT: 80,
    HTML_STATUS_CODE: { SUCCESS: 200, CREATED: 201, UNAUTHORIZED: 401, INVALID_DATA: 406, INTERNAL_ERROR: 500, BAD_REQUEST: 400, NOT_FOUND: 404, INVALID_CREDENTIAL: 405 },
    MODEL_NAME: { TRADE: 'homes', USER: 'users' },
    MESSAGE: {
        USER: {
            USER_ALREADY_REGISTERED: 'It seems like user is already registered with the same phone number.',
            MESSAGE_UNAUTHORIZED_USER: 'Unauthorized User',
            MESSAGE_INVALID_CREDENTIALS: 'Invalid Credentials.',
            NOT_REGISTERED: 'User not registered with the given Phone Number.',
            LOGIN_SECCESS: 'User loggedin successfully',
            CREATED: 'New user created. Please login to continue..',
            SENTMAIL:'Please check your mail for OTP',
            OTPEXPIRED:'OTP got expired..please  click on resend otp',
            WRONGOTP:'Please enter the correct otp',
            OTPSUCESS:"OTP verified successfully",
            PINUPDATED:"Pin updated successfully"
        },
        TRADE: {
            ALREADY_EXIST: 'Trade is already exists',
            NOT_EXIST: 'User not exist',
            NOT_EXIST_SYMBOL: 'Symbol not exist',
            NO_DATA: 'There are no trades in the given date range',
            CREATED: 'New trade created',
            DELETED: 'Trade deleted successfully'
        },
        COMMON: {
            INTERNAL_ERROR: 'Sorry! Something went wrong.',
            MESSAGE_INVALID_DATA: 'Invalid payload.',
            MESSAGE_BAD_REQUEST: 'Bad request/Unknown requested fields.',
            MESSAGE_DATA_NOT_FOUND: 'Data not found.',
            MESSAGE_UNAUTHORIZED_ACCESS: 'You are not authorized for this action.',
            DATA_FOUND: 'Data found',

        }
    },
    JWT: {
        SECRET: 'trade@assign',
        TOKEN_TIMEOUT: '120d',

    }

}
module.exports = constant;