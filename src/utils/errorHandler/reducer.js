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
                message: 'Email already registered! a new user cannot be created with this email',
                logError: true
            }  
        case errors.WRONG_USER:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Email or password incorrect',
                logError: true
            }  
        case errors.NAME_EMPTY:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Please fill Name field',
                logError: true
            }  
        case errors.EMAIL_EMPTY:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Please Fill Email field',
                logError: true
            }  
        case errors.PASSWORD_EMPTY:
            return {
                ...defaultDetails,
                status: 400,
                message: 'Please Fill Password field',
                logError: true
            }  
        case errors.PRISMA_UNIQUE_EMAIL:
            return {
                ...defaultDetails,
                status: 409,
                message: 'a new user cannot be created with this email',
                logError: true
            }  
        default:
            return defaultDetails
    }
}