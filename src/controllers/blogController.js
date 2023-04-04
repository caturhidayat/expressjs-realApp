import { prisma } from "../prisma/prisma.js";
import { blogPost } from "../middlewares/blogValidator.js";
import Joi from "joi";


const secret = process.env.TOKEN_SECRET

class blogController {
    // GET HOME
    async getHome(req, res) {
        // Find All log Post / Article
        const article = await prisma.blog.findMany({
            where: { published: true },
            include: { author: true }
        })
        res.render('index', { article: article })
    }

    // CREATE BLOG POST
    async postBlog(req, res, next) {
        const { tittle, content } = req.body;
        // console.info({ userFromDecode: req.user })
        try {
            // validate data input
            await blogPost.validateAsync({ tittle, content })
            // Create Blog Post
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
            res.status(201).json({ article })
        } catch (error) {
            if( error instanceof Joi.ValidationError) {
                res.status(400).json({ error: error.message })
            }
            next(error)
        }
    }

    // GET CREATE BLOG PAGE
    getCreateBlog(req, res) {
        res.render('blog/create')
    }

    // GET BLOG PAGE
    async getBlogs(req, res) {
        // console.info({ userFromDecode: req.user })
        try {
            // Find All blog post / article - Without auth
            const article = await prisma.blog.findMany({
                where: { authorId: req.user.id },
                include: {
                    author: true
                }
            })
            res.render('blog/blogs', { article: article })
        } catch (error) {
            res.status(400).json({ errors : error.message })
        }
    }

    // GET SINGLE BLOG PAGE 
    async getBlog(req, res) {
        const id  = parseInt(req.params.id)
        // Find single blog post
        const article = await prisma.blog.findUnique({
            where: { id },
            include: { author: true }
        })
        res.render('blog/blog', { article: article })
    }

    // DELETE BLOG POST
    async deleteBlog(req, res) {
        const id  = parseInt(req.params.id)
        const article = await prisma.blog.delete({
            where: { id }
        })
        res.redirect('/blogs')
    }

    // GET UPDATE BLOG UPDATE PAGE
    async getUpdate(req, res) {
        const id  = parseInt(req.params.id)
        // Find Blog post / araticle
        const article = await prisma.blog.findUnique({
            where: { id }
        })
        res.render(`blog/update`, { article })
    }

    // UPDATE BLOG POST / ARTICLE
    async postUpdate(req, res, next) {
        const id  = parseInt(req.params.id)
        const { tittle, content, publish } = req.body

        try {
            // Validate data input
            await blogPost.validateAsync({ tittle, content })
            // Check Publish status
            const published = publish === "true" ? true : false
            // Update Post / article
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

    // UPDATE PUBLISH STATUS = TRUE
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

    // SEARCH 
    async searchArticle(req, res, next) {
        const search = req.query.article

        const articles = await prisma.blog.findMany({
            where: {
                OR: [
                    {
                        tittle: {
                            contains: search
                        }
                    },
                    {
                        content: {
                            contains: search
                        }
                    }
                ]
            },
            select: {
                tittle: true,
                content: true
            }
        })
        res.status(201).json({ articles: articles })
    }
}


export { blogController }
