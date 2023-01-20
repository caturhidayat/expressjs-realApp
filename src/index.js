import { app } from './server.js';
const port = process.env.PORT 

// Import routes
import { main } from './routes/index.js'

// ROUTE
app.use('/', main);


// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})