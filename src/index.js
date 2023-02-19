import { app } from './server.js';
const port = process.env.PORT 

// Import routes
import { main } from './routes/index.js'
import { requireAuth } from "./middlewares/authMiddleware.js";
import { authRoute } from './routes/authRoute.js';
import { blogRoute } from './routes/blogRoute.js';


// ROUTE
app.use('/', main);
app.use('/', authRoute)
app.use('/blogs', requireAuth, blogRoute)


// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})

