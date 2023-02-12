import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query'
        },
        {
            emit: 'stdout',
            level: 'error'
        },
        {
            emit: 'stdout',
            level: 'info'
        },
        {
            emit: 'stdout',
            level: 'warn'
        },
    ]
})

prisma.$on('query', (e) => {
    console.info(`Query : ${e.query}`)
    console.info(`Params : ${e.params}`)
    console.info(`Duration : ${e.duration}`)
})

export { prisma }