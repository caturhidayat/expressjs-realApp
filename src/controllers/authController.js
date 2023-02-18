import { prisma } from "../prisma/prisma.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import jwt from 'jsonwebtoken'


class authController {

    getSignup(req, res) {
        res.render("signup");
    }

    async postSignup(req, res) {
        const { name, email, password } = req.body
        const hash = await hashPassword(password)
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash
                }
            })
            res.status(201).json({ user: user.id })
        } catch (error) {
            res.status(400).json({ error })
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
                const matchPass = comparePassword(password, user.password)
                if(matchPass) {
                    // delete user.password
                    const token = jwt.sign({ user }, process.env.SECRET_KEY)
                    console.info(process.env.SECRET_KEY)
                    console.info({ token: token}) 
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
                    res.status(200).json({ user: user.id })
                }
            }
            
        } catch (err) {
            res.status(400).json({ isError: err.message })
        }
    }

    getProfile(req, res) {
        res.redirect('/profile')
    }
}


export { authController }