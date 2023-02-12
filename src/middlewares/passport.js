import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from '../prisma/prisma.js'

const opts = {}
opts.JwtStrategy = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.JwtStrategy.secretOrKey = process.abort.env.SECRET_KEY

passport.use('jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: jwt_payload.sub }
        })
        if(user) return done(null, user)
    } catch (err) {
        return done(err, false)
    }
}))