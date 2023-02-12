import { Router } from "express";
import { postController } from "../controllers/postControllers.js";
const PostCcontroller = new postController()

const postRoute = Router();

postRoute.get('/', PostCcontroller.getAll)
postRoute.get('/:id', PostCcontroller.getSingle)
postRoute.post('/', PostCcontroller.create)
postRoute.put('/:id', PostCcontroller.update)
postRoute.delete('/:id', PostCcontroller.delete)


export { postRoute }
