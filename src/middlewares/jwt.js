import * as jwt from "jsonwebtoken";
const token_secret = process.env.TOKEN_SECRET.toString()


const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(401)

    jwt.verify(token, token_secret, (err, user) => {
        console.info({error: err, message: 'need auth'})

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    } )
}


export { authenticationToken }