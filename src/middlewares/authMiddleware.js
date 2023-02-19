import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/prisma.js'


const secret = process.env.TOKEN_SECRET

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, secret, (err, decodeToken) => {
            if(err) {
                // console.info(err.message)
                res.redirect('/login')
            } else {
                // console.info({decodeToken: decodeToken})
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt
    
    
    if(token) {
        jwt.verify(token, secret, async (err, decodeToken) => {
            if(err) {
                res.locals.user = null
                next()
            } else {
                let user = await prisma.user.findUnique({
                    where: { id : decodeToken.id}
                })
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

export { requireAuth, isLoggedIn }