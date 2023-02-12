import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from '../prisma/prisma.js'

const opts = {}
opts.JwtStrategy = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.JwtStrategy.secretOrKey = 'secret'
opts.JwtStrategy.issuer = 'account@email.com'
opts.audience = 'local.host'

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

}))