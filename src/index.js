import { app } from './server.js';
const port = process.env.PORT 


// Import error handler
import errorHandler from './utils/errorHandler/index.js'


// Middleware error handler
app.use(errorHandler)

// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})

