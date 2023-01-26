import { Prisma, PrismaClient } from "@prisma/client";
import { auth } from "../utils/auth.js";
import * as jwt from "jsonwebtoken";

const authUser = new auth();

const prisma = new PrismaClient();

class userService {
    constructor() {}

    // Get All Users
    async getAllUser(req, res) {
        const data = await prisma.user.findMany();
        res.json(data);
    }

    // Get a single User
    async getSingleUser(id, req, res) {
        try {
            const data = await prisma.user.findUniqueOrThrow({
                where: { id: id },
            });
            res.json(data);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.code, e.message);
                res.json(e);
            }
        }
    }

    // Create New User
    async createUser(body, req, res) {
        const password = req.body.password;
        const hashPass = await authUser.hashPassword(password);

        try {
            const data = await prisma.user.create({
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
    async signIn(req, res) {
        const { email, password } = req.body;
        const secret = process.env.TOKEN_SECRET.toString();
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        // console.info(secret)

        // Compare Password
        if (user) {
            const match = authUser.comparePassword(password, user.password);
            if(match) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        id: user.id,
                    },
                    process.env.TOKEN_SECRET.toString(),
                    {
                        expiresIn:'15s'
                    }
                );
                // console.info(token)
                res.json({
                    user: user,
                    message: "Sign in Success!👏🏼",
                    accessToken: token,
                });
            }
        } else {
            res.json(`email or password wrong ❌`);
        }
    }
}

export { userService };
