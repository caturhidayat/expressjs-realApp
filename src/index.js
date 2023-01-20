import { app } from './server.js';
const port = process.env.PORT 

// Import routes
import { main } from './routes/index.js'
import { userRoute } from './routes/userRoute.js';

// ROUTE
app.use('/', main);
app.use('/users', userRoute)


// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})