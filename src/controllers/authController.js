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

getSignup(req, res, next) {
    res.render("signup");
}

async postSignup(req, res, next) {
    const { name, email, password } = req.body
    try {

        if(!name) throw new Error(`name/empty`)
        if(!email) throw new Error('email/empty')
        if(!password) throw new Error('password/empty')

        // if(!name) throw new Error('Please fill name field')
        // if(!email) throw new Error('Please fill email field')
        // if(!password) throw new Error('Please fill password field')
        const checkEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!checkEmail) throw new Error(`prisma/uniqueEmail`)

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
        
        // if(error instanceof Prisma.PrismaClientKnownRequestError) {
        //     if(error.code === 'P2002') {
        //         // console.table('a new user cannot be created with this email')
        //         // res.json({ message: 'a new user cannot be created with this email' })
        //         throw new Error(`prisma/uniqueEmail`)
        //     } 
        // }
        // res.status(400).json({ error: error.message })
        next(error)
        // res.json(error)
    }
}

getLogin(req, res) {
    res.render("login");
}

async postLogin(req, res) {
    const { email, password } = req.body

    try {
        if(!email) throw new Error('Please fill Email field')
        if(!password) throw new Error('Please fill Password field')

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
            } else {
                throw new Error('Email or Password wrong!')
                // throw new Error('Password wrong!')
            }
        } else {
            // throw new Error('Email wrong!')
            throw new Error('Email or Password wrong!')
        }
        
    } catch (error) {
        res.status(404).json({ error: error.message })
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