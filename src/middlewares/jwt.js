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

const isLoggedIn = async (req, res, next) => {
    const authHeader = await req.cookies.jwt;
    // console.info(authHeader)
    const decode = jwt.decode(authHeader)
    // console.info(decode.id)
    try {
        const user = await prisma.user.findUnique({
            where: { id: decode }
        })

        if(user) {
            res.status(200).json({ name: user.name, email: user.email })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
    next()
}


export { authenticationToken, isLoggedIn }