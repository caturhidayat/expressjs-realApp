import express from "express";
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { isLoggedIn } from "./middlewares/authMiddleware.js";
// import expressValidator from 'express-validator'

// Import routes
import { main } from './routes/index.js'
import { requireAuth } from "./middlewares/authMiddleware.js";
import { authRoute } from './routes/authRoute.js';
import { blogRoute } from './routes/blogRoute.js';

// Import routes
import { main } from './routes/index.js'
import { requireAuth } from "./middlewares/authMiddleware.js";
import { authRoute } from './routes/authRoute.js';
import { blogRoute } from './routes/blogRoute.js';

// Import error handler
import errorHandler from "./utils/errorHandler/index.js";

// Middleware error handler
app.use(errorHandler)

// Test CORS with Withlist
// const withList = [
//     'http://authorized-origin.com'
// ]

// const corsOptions = {
//     origin: (origin, callback) => {
//         if(withList.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error(`cors/origin`))
//         }
//     }
// }

// test error Handler with CORS
// app.get('/cors', cors(corsOptions), (req, res, next) => {
//     res.json({ message: 'CORS check passed successfully!'})
// })

// Test some error handler
app.get('/reducer', (req, res) => {
    const nilai = true
    try {
        if(!nilai) {
            throw new Error(`email/empty`)
        }
        res.json({ message: `OK! 🔥`})
    } catch (error) {
        throw error
        // res.json(error)
    }
})



// Error handler
// app
//     .get('*', (req, res, next) => {
//         throw new Error(`Off, I Broke... 🔨`)
//     })
//     .post('*', (req, res, next) =>
//     {
//         res.json({ message: `No Breakage here!` })
//     })

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.engine('hbs', engine())
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(cookieParser())
// app.use(expressValidator())
app.get('*', isLoggedIn)

// ROUTE
app.use('/', main);
app.use('/', authRoute)
app.use('/blogs', requireAuth, blogRoute)


// RUN APP
app.listen(port, () => {
    console.info(`⚡️ [Server] running on http://localhost:${port}`)
})

// export { app }

