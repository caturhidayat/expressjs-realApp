import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class userService {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }

    async getAllUser(req, res) {
        const data = await prisma.user.findMany();
        res.json(data)
    }
    async getSingleUser(id, req, res) {
        const data = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        res.json(data)
    }
    async createUser(body, res) {
        const data =  await prisma.user.create({
            data: {
                email: body.email,
                password: body.email
            },
        });
        res.json(data)
    }
    async updateUser(id, res) {
        const data = await prisma.user.update({
            where: {
                id: id,
            },
        });
        res.json(data)
    }
    async deleteUser(id, res) {
        const data = await prisma.user.delete({
            where: { id: id },
        });
        res.json(data)
    }
}

export { userService };
