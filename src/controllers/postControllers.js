import { postService } from '../services/postService.js'

const PostService = new postService()

class postController {

    getAll(req, res) {
        PostService.getAll(req, res)
    }
    getSingle(req, res) {
        PostService.getSingle(req, res)
    }
    create(req, res) {
        PostService.create(req, res)
    }
    update(req, res) {
        PostService.update(req, res)
    }
    delete(req, res) {
        PostService.delete(req, res)
    }

} 

export { postController };
