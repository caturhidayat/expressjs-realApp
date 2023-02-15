import { prisma } from "../prisma/prisma.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";


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
            const matchPass = comparePassword(password, user.password)

            if(user) {
                if(matchPass) {
                    res.status(200).json({ user })
                }
            }
            
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    getProfile(req, res) {
        res.render('profile')
    }
}


export { authController }