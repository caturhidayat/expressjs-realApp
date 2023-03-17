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
        // Handle CORS Errors
        case errors.CORS_ORIGIN:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Not authorized by CORS',
                logError: false
            }  
        case errors.DUPLICATE_EMAIL:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Email already registered!',
                logError: true
            }  
        case errors.WRONG_USER:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Email or password incorrect',
                logError: true
            }  
        default:
            return defaultDetails
    }
}