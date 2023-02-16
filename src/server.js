import express from "express";
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { engine } from "express-handlebars";

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../src/prisma/prisma.js";


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.engine('hbs', engine())
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(passport.initialize())



// JWT Passport

const cookieExtractor = function(req) {
    const token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: jwt_payload.sub },
            });
            console.table(user)
            if (user) return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    })
);





export { app }

