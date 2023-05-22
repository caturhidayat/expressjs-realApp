import { Router } from "express";
import { blogController } from "../controllers/blogController.js";
// import { requireAuth } from "../middlewares/authMiddleware.js";



const blogRoute = Router();
const BlogController = new blogController()

// Auth
blogRoute.get("/create", BlogController.getCreateBlog);
blogRoute.post("/create-post", BlogController.postBlog);

blogRoute.get("/", BlogController.getBlogs);
blogRoute.get("/:id", BlogController.getBlog);
blogRoute.get("/update/:id", BlogController.getUpdate);
blogRoute.patch("/update/:id", BlogController.postUpdate);
blogRoute.patch("/publish/:id", BlogController.postPublish);

blogRoute.post("/:id", BlogController.deleteBlog);



export { blogRoute }