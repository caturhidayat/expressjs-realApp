import reducer from './reducer.js'

// export default (err, req, res, next) => {
//     res.status(500).json({ error: err.message })
// }


export default (err, res, req, next) => {
    // Get the error response details
    let { status, message, logError } = reducer(err)

    // Should I log this error?
    if(logError) {
        // You could add custom logging here
        // FOr Simplicity, I am just console logging
        console.log({
            message: err.message,
            stack: err.stack,
            method: req.method,
            path: req.path
        })
    }
    // Send error response
    res.status(status)
    res.json({ error: message })

}

// export { errorHandler }

