import errors from "./errors.js";


// Default Error Details
const defaultDetails = {
    status: 500,
    message: 'Something failed!',
    logError: true
}

// Defines how to handle errors
export default (err) => {
    switch ( err.message ) {
        case errors.CORS_ORIGIN:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Not authorized by CORS',
                logError: false
            }  
        default:
            return defaultDetails
    }
}