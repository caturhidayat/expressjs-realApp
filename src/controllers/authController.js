import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import jwt from 'jsonwebtoken'


// Create Token
const maxAge = 60 * 60 * 24
const secret = process.env.TOKEN_SECRET
const createToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: '1d'})
}

class authController {

    getSignup(req, res) {
        res.render("signup");
    }

    async postSignup(req, res) {
        const { name, email, password } = req.body
        try {
            if(name.trim() === "") error.name = "Name Must not be Empty"
            if(email.trim() === "") error.email = "Email Must not be Empty"
            if(password.trim() === "") error.password = "Password Must not be Empty"

            if(Object.keys(error).length > 0 ) {
                throw error
            }

            const hash = await hashPassword(password)
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash
                }
            })
            res.status(201).json({ user: user.id })
        } catch (error) {
            const errors = error instanceof Prisma.PrismaClientKnownRequestError
            res.status(400).json({ errors })
        }
    }

    getLogin(req, res) {
        res.render("login");
    }

    async postLogin(req, res) {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            })
            
            
            if(user) {
                const matchPass = await comparePassword(password, user.password)
                if(matchPass) {
                    const token = await createToken(user.id)
                    // console.info({ token: token}) 
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge })
                    res.status(200).json({ user: user.id })
                }
            }
            
        } catch (err) {
            res.status(400).json({ isError: err.message })
        }
    }

    getProfile(req, res) {
        res.render('profile')
    }

    getLogout(req, res) {
        res.cookie('jwt', '', { maxAge: 1 })
        res.redirect('/')
    }
}


export { authController }