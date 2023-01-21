import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnection = async () => {
    await prisma.$connect("Database Connected! 🔌");
};

prismaConnection()
    .catch((e) => console.error(e))
    .finally(
        async () =>
            await prisma.$disconnect("Cannot Connect to Databases... ❌")
    );
