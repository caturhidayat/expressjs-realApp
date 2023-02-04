import express from "express";
const app = express();
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { createHmac } from "crypto";
import cookieParser from 'cookie-parser'
import passport from "passport";
import session from "express-session";
import { engine } from 'express-handlebars'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Template Engine
app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');


// Static Dir / Files
app.use(express.static('public'))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name:'session', 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cors());
app.use(cookieParser())
app.use(passport.initialize())
// app.use(passport.session())



// Generate Token 
const hash = createHmac('sha256', process.env.SECRET).digest('hex')
// console.info({tSecret: hash})
// console.info({token_secret: process.env.TOKEN_SECRET})

export { app };
