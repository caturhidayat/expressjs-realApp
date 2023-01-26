import express from "express";
const app = express();
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import cookie from 'cookie-parser'

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookie())


// Generate Token 
const hash = createHmac('sha256', process.env.SECRET).digest('hex')
// console.info({tSecret: hash})
// console.info({token_secret: process.env.TOKEN_SECRET})

export { app };
