import express from "express";
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { isLoggedIn } from "./middlewares/authMiddleware.js";
import errorHandler from "./utils/errorHandler/index.js";


const withList = [
    'http://authorized-origin.com'
]

const corsOptions = {
    origin: (origin, callback) => {
        if(withList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`cors/origin`))
        }
    }
}


app.get('/cors', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'CORS check passed successfully!'})
})

// Error handler
app
    .get('*', (req, res, next) => {
        throw new Error(`Off, I Broke... 🔨`)
    })
    .post('*', (req, res, next) =>
    {
        res.json({ message: `No Breakage here!` })
    })

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.engine('hbs', engine())
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(cookieParser())
app.get('*', isLoggedIn)
app.use(errorHandler)




export { app }

