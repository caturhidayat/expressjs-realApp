import { prisma } from '../prisma/prismaConnection.js'


class postService {
    constructor() {}

    // Get All Post
    async getAll(req, res){
        const post = await prisma.post.findMany({
            where: { published: true}
        })
        res.render('posts/posts', { post: post})
    }
    async getSingle(req, res){
        const id = req.body.id
        const post = await prisma.post.findUnique({
            where: { id: id}
        })
        res.render('posts/post', { post: post})
    }

    async create(req, res){
        const {title, content} = req.body
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content
            }
        })
        res.render('posts/posts', { post: post})
    }

    async update(req, res){
        const id = req.body.id
        const post = await prisma.post.update({
            where: { id: id},
            data: { 
                title: req.body.title,
                content: req.body.content
            }
        })
        res.render('posts/posts', { post: post})
    }

    async delete(req, res){
        const id = req.body.id
        const post = await prisma.post.delete({
            where: { id: id}
        })
        res.render('posts/posts', { post: post})
    }
   
}

export { postService };
