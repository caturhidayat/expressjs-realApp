import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'minimal'
});

const prismaConnection = async () => {
    await prisma.$connect("Database Connected! 🔌");
};

prismaConnection()
    .catch((e) => console.error(e))
    .finally(
        async () =>
            await prisma.$disconnect("Cannot Connect to Databases... ❌")
    );


export { prisma, prismaConnection }