import { prisma } from '../prisma/prismaConnection.js'
import jwt from 'jsonwebtoken'
import { auth } from '../utils/auth.js';

const Auth = new auth()
// SECRET
const secret = process.env.TOKEN_SECRET

// Craete json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    });
};

// Auth Controllers action
 class authController {
    constructor() {}

    signupGet(req, res) {
        res.render('users/signup')
    }

    loginGet(req, res) {
        res.render('users/login')
    }

    async signupPost(req, res) {
        const { name, email, password } = req.body;
        const hassPassword = Auth.hashPassword(password)
        try {
            const user = await prisma.user.create({
                data: { 
                    name: name, 
                    email: email, 
                    password: hassPassword
                }
            })
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(201).json({ user: user.id })
        } catch (err) {
            res.status(400).json({ err })
        }
    }
    
    async loginPost(req, res) {
        const { id, email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            })
            const matchPass = Auth.comparePassword(password, user.password)
            if(user) {
                if(matchPass) {
                    const token = createToken(user.id)
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                    res.status(200).json({ user: user.id })
                }
            }
        } catch (err) {
            res.status(400).json({ err })
        }
    }

    profile(req, res) {
        res.render('users/profile')
    }
 }

 export { authController }