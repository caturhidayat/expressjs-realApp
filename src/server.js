import express from "express";
const app = express();
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { isLoggedIn } from "./middlewares/authMiddleware.js";



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     name:'session', 
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
app.use(cors());
app.engine('hbs', engine())
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(cookieParser())
app.get('*', isLoggedIn)





// Generate Token 
// const hash = createHmac('sha256', process.env.SECRET).digest('hex')
// console.info({tSecret: hash})
// console.info({token_secret: process.env.TOKEN_SECRET})

export { app };
