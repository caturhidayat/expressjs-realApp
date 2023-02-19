import { prisma } from "../prisma/prisma.js";

class blogController {
    async create(req, res) {
        const { tittle, content } = req.body;
        const { id } = req.cookies.jwt;

        try {
            const article = await prisma.blog.create({
                data: {
                    tittle,
                    content,
                    author: {
                        connect: {
                            id,
                        },
                    },
                },
            });
            res.status(201).json({ article })
            
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    getCreate(req, res) {
        res.render('blog/create')
    }

    async getArticle(req, res) {

        try {
            const article = await prisma.blog.findMany({})
            // res.status(200).json({ article })
            res.render('blog/blogs', { article: article })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}


export { blogController }
