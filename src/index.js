import { app } from './server.js';
const port = process.env.PORT 

// Import routes
import { main } from './routes/index.js'
import { authRoute } from './routes/authRoute.js';


// ROUTE
app.use('/', main);
app.use('/', authRoute)


// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})