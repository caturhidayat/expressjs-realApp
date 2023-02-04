import { Prisma } from "@prisma/client";
import { auth } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prismaConnection.js";
import passport from "passport";

const authUser = new auth();

class userService {
    constructor() {}

    // Get All Users
    async getAllUser(req, res) {
        const cookie = req.cookies;
        const data = await prisma.user.findMany();
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token) console.info({ token: token });
        // if (data.some(user => user.email === req.user.email)) {
        //     res.json({data: data});
        // }
        // console.info(req.user);

        console.info({ kuki: cookie });
        // res.json(data);
        res.render("users", { data: data });
        // res.json(data.filter((user) => user === req.user.email));
    }

    // Get a single User
    async getSingleUser(id, req, res) {
        try {
            const data = await prisma.user.findUniqueOrThrow({
                where: { id: id },
            });
            res.json({ data: data });
            // res.json(data);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // console.info(e.code, e.message);
                res.json(e.message);
            } else if (e instanceof jwt.JsonWebTokenError) {
                res.json(e.message);
            }
        }
    }

    // Create New User
    async createUser(body, req, res) {
        // passport.authenticate("signup", {
        //     session: false,
        //     failureRedirect: "/login",
        // }),
        //     async (req, res, next) => {
        //         res.redirect("/profile");
        //     };

        const password = req.body.password;
        const hashPass = await authUser.hashPassword(password);

        try {
            const data = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: hashPass,
                },
            });
            res.redirect("/");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.code, e.message);
                res.json(e);
            }
        }
    }

    // Update User
    async updateUser(id, body, req, res) {
        const password = req.body.password;
        const hashPass = await authUser.hashPassword(password);
        try {
            const data = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: body.email,
                    password: hashPass,
                },
            });
            res.json(data);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.code, e.message);
                res.json(e);
            }
        }
    }

    // Delete User
    async deleteUser(id, res) {
        try {
            const data = await prisma.user.delete({
                where: { id: id },
            });
            res.json(`User ${data.email} deleted 🗑`);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.code, e.message);
                res.json(e);
            }
        }
    }

    // Sign In Function
    async login(req, res, next) {
        // passport.authenticate("login"),
        //     async (err, user, info) => {
        //         try {
        //             if (err || !user) {
        //                 const error = new Error(`An error occured!`);
        //                 return next(error);
        //             }
        //             req.login(user, { session: false }, async (error) => {
        //                 if (error) return next(error);

        //                 const body = { _id: user.id, _email: user.email };
        //                 const token = jwt.sign(
        //                     { user: body },
        //                     process.env.TOKEN_SECRET
        //                 );
        //                 res.redirect("/profile");
        //             });
        //         } catch (error) {
        //             return next(error);
        //         }
        //     };

        const { email, password } = req.body;
        const secret = process.env.TOKEN_SECRET.toString();
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET.toString();
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        // console.info(secret)

        // Compare Password
        if (!user) {
            res.json(`Email or password wrong ❌`);
        } else if (user) {
            const match = authUser.comparePassword(password, user.password);
            if (!match) {
                res.json(`Email or password wrong ❌`);
            } else {
                const token = jwt.sign(user, secret, { expiresIn: "12h" });
                const refreshToken = jwt.sign(user, refreshSecret, { expiresIn: '2m'});
                // console.info(token)
                // res.cookie('token', token)
                // res.set('Authorization', 'Bearer' + ' ' + token)
                res.cookie("jwt", refreshToken);
                // res.json({
                //     user: user,
                //     message: "Sign in Success!👏🏼",
                //     accessToken: token,
                //     refreshToken: refreshToken,
                // });
                res.redirect("/profile");
            }
        }
    }

    loginPage(req, res) {
        res.render("users/login", { tittle: "Login Page" });
    }
    signUpPage(req, res) {
        res.render("users/signup", { tittle: "Signup Page" });
    }

    // logout
    async logout(req, res) {
        // const user = await req.user
        // console.info(`email ${user.email} already logout`)
        res.clearCookie("jwt", { path: "/" });
        const destroyTokeen = res.json(
            `email already logout, ${destroyTokeen} deleted`
        );
    }

    // Profile
    profile(req, res) {
        const secret = process.env.TOKEN_SECRET.toString();
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET.toString();
        const jwtCookie = req.cookies.jwt;
        const user = req.user;

        // console.info({token: user})
        try {
            // const users = jwt.verify(user, secret)
            const users = jwt.verify(jwtCookie, refreshSecret);
            res.render("users/profile", { users });
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                res.json(e.message);
            }
        }
    }
}

export { userService };
