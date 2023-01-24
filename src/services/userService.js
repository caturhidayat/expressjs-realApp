import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class userService {
    constructor() {}

    async getAllUser(req, res) {
        const data = await prisma.user.findMany();
        res.json(data);
    }
    async getSingleUser(id, req, res) {
        try {
            const data = await prisma.user.findUniqueOrThrow({
                where: { id: id}
            });
            res.json(data);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.code, e.message);
                res.json(e);
            }
        }
    }
    async createUser(body, res) {
        try {
            const data = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
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
    async updateUser(id, body, res) {
        try {
            const data = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email: body.email,
                    password: body.password,
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
}

export { userService };
