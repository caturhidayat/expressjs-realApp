import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const token_secret = process.env.TOKEN_SECRET.toString()
const prisma = new PrismaClient()


const authenticationToken = async (req, res, next) => {
    // const { email, password } = req.body
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, token_secret, (err, user) => {
        if (err instanceof jwt.JsonWebTokenError) {
            // if (err) console.info({name: err.name, message: err.message})
            return res.status(401).end()
        }

        req.user = user

        next()
    } )
}


export { authenticationToken }