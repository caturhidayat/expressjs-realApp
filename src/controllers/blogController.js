import { prisma } from "../prisma/prisma.js";
import jwt from 'jsonwebtoken'

const secret = process.env.TOKEN_SECRET

class blogController {
    async postBlog(req, res) {
        const { tittle, content } = req.body;
        const token = req.cookies.jwt
        // const user = jwt.verify(token, secret)
        console.info({ userFromDecode: req.user })
        
        try {
            const article = await prisma.blog.create({
                data: {
                    tittle: tittle,
                    content: content,
                    author: {
                        connect: {
                            id : req.user.id,
                        },
                    },
                },
                include: { author: true }
            });
            // console.info({ article })
            res.status(201).json({ article })
            // console.table(article)
            
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    getCreateBlog(req, res) {
        res.render('blog/create')
    }

    async getBlogs(req, res) {

        console.info({ userFromDecode: req.user })
        try {
            const article = await prisma.blog.findMany({
                where: { authorId: req.user.id },
                include: {
                    author: true
                }
            })
            // res.status(200).json({ article })
            res.render('blog/blogs', { article: article })
        } catch (error) {
            res.status(400).json({ errors : error.message })
        }
    }

    async getBlog(req, res) {
        const id  = parseInt(req.params.id)

        const article = await prisma.blog.findUnique({
            where: { id },
            include: { author: true }
        })
        res.render('blog/blog', { article: article })
    }

    async deleteBlog(req, res) {
        const id  = parseInt(req.params.id)
        const article = await prisma.blog.delete({
            where: { id }
        })
        res.redirect('/blogs')
    }

    // get Update blog page
    async getUpdate(req, res) {
        const id  = parseInt(req.params.id)
        const article = await prisma.blog.findUnique({
            where: { id }
        })
        res.render(`blog/update`, { article })
    }

    // Update blog post / content
    async postUpdate(req, res) {
        const id  = parseInt(req.params.id)
        // console.table({ this_id: id})
        const { tittle, content } = req.body
        const article = await prisma.blog.update({
            where: { id: id },
            data: {
                tittle: tittle,
                content: content
            }
        })
        res.status(201).json({ article })
    }
}


export { blogController }
