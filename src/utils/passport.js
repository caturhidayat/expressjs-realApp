import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { prisma } from '../prisma/prismaConnection.js'


passport.use(
    new Strategy({usernameField: 'email'}, async (email, password, done) => {
        const user = await prisma.user.findUnique({ where: { email }})
        const response = 'Invalid login  credential'

        if(!user) return done(response)
        else if (user) {
            const match = authUser.comparePassword(password, user.password);

            if(match) return done(null, user)

            return done(response)
        }
    })
)


passport.serializeUser((user, done) => {
    done(null, (user))
})

passport.deserializeUser(async(id, done) => {
    const user = await prisma.user.findUnique({ where: { id }})
    if(!user) return done('No User to deserialize')

    return done(null, user)
})


export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()

    res.status(401)
}