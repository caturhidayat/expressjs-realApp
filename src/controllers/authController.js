import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/prisma.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import { authSignup, authLogin } from "../middlewares/authValidator.js";

authLogin
// Create Token
const maxAge = 60 * 60 * 24;
const secret = process.env.TOKEN_SECRET;
const createToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: "1d" });
};

class authController {
    getSignup(req, res, next) {
        res.render("signup");
    }

    async postSignup(req, res, next) {
        const { name, email, password } = req.body;
        try {
            const value = await authSignup.validateAsync({ name, email, password });

            const hash = await hashPassword(password);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash
                }
            });
            res.status(201).json({ user: user.id });
        } catch (error) {
            console.info(error.message)
            next(error);
            // res.json(error)
        }
    }

    getLogin(req, res) {
        res.render("login");
    }

    async postLogin(req, res, next) {
        const { email, password } = req.body;

        try {
            await authLogin.validateAsync({ email, password })
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            if (user) {
                const matchPass = await comparePassword(
                    password,
                    user.password
                );
                if (matchPass) {
                    const token = await createToken(user.id);
                    // console.info({ token: token})
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: 1000 * maxAge,
                    });
                    res.status(200).json({ user: user.id });
                } else {
                    throw new Error('auth/wrongUserPassword');
                }
            } else {
                throw new Error('auth/wrongUserPassword');
            }
        } catch (error) {
            console.info(error.message)
            next(error)
        }
    }

    getProfile(req, res) {
        res.render("profile");
    }

    getLogout(req, res) {
        res.cookie("jwt", "", { maxAge: 1 });
        res.redirect("/");
    }
}

export { authController };
