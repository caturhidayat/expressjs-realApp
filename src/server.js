import express from "express";
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { isLoggedIn } from "./middlewares/authMiddleware.js";



// Middleware
app.use((error, req, res, next) => {
    console.info("Error Handling Middleware called")
    console.info("path: ", req.path)
    next()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.engine('hbs', engine())
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(cookieParser())
app.get('*', isLoggedIn)




export { app }

