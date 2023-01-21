import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class userService {
    constructor() {}

    async getAllUser(req, res) {
        const data = await prisma.user.findMany();
        res.json(data);
    }
    async getSingleUser(id, req, res) {
        try {
            const data = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            res.json(data);
        } catch (Error) {
            return `User tidak ada: Error -->> ${Error}`;
        }
    }
    async createUser(body, res) {
        try {
            const data = await prisma.user.upsert({
                where: { email: body.email },
                update: {},
                create: {
                    email: body.email,
                    password: body.password
                }
            })
            res.json(data);
        } catch (Error) {
            return `Email sudah pernah digunakan`
        }
    }
    async updateUser(id, res) {
        const data = await prisma.user.update({
            where: {
                id: id,
            },
        });
        res.json(data);
    }
    async deleteUser(id, res) {
        const data = await prisma.user.delete({
            where: { id: id },
        });
        res.json(data);
    }
}

export { userService };
