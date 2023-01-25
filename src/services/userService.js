import { Prisma, PrismaClient } from "@prisma/client";
import { auth } from "../utils/auth.js";

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

    async signIn(req, res) {
        const { email, password } = req.body;

        // const user = await prisma.user.findUnique({
        //     where: { email: email },
        // });
        // const match = authUser.comparePassword(password, user.password);
        // res.json({user: user, compare: match, plaintextpass: password})

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        // Compare Password
        const match = authUser.comparePassword(password, user.password);
        if (user && match) {
            res.json({ user: user, message: "Sign in Success!👏🏼" });
        } else {
            res.json(`email or password wrong ❌`);
        }
    }
}

export { userService };
