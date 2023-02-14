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

    postLogin(req, res) {
        
    }

    getProfile(req, res) {
        res.render('pofile')
    }
}


export { authController }