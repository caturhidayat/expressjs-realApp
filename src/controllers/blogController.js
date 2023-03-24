import { prisma } from "../prisma/prisma.js";
import { blogPost } from "../middlewares/blogValidator.js";
import Joi from "joi";


const secret = process.env.TOKEN_SECRET

class blogController {

    async getHome(req, res) {
        const article = await prisma.blog.findMany({
            where: { published: true },
            include: { author: true }
        })
        res.render('index', { article: article })
    }

    async postBlog(req, res, next) {
        const { tittle, content } = req.body;
        // const token = req.cookies.jwt
        console.info({ userFromDecode: req.user })
        
        try {
            // validate data input
            await blogPost.validateAsync({ tittle, content })
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
            if( error instanceof Joi.ValidationError) {
                res.status(400).json({ error: error.message })
            }
            next(error)
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
    async postUpdate(req, res, next) {
        const id  = parseInt(req.params.id)
        // console.table({ this_id: id})
        const { tittle, content, publish } = req.body

        try {
            await blogPost.validateAsync({ tittle, content })
            const published = publish === "true" ? true : false
            const article = await prisma.blog.update({
            where: { id: id },
            data: {
                tittle: tittle,
                content: content,
                published: published
            }
        })
        res.status(201).json({ article })
        } catch (error) {
            if( error instanceof Joi.ValidationError) {
                res.status(400).json({ error: error.message })
            }
            next(error)
        }

        
    }
    async postPublish(req, res) {
        const id  = parseInt(req.params.id)
        const article = await prisma.blog.update({
            where: { id: id },
            data: {
                published: true
            }
        })
        res.status(201).json({ article })
    }
}


export { blogController }
