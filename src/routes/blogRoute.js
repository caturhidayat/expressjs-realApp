import { Router } from "express";
import { blogController } from "../controllers/blogController.js";
// import { requireAuth } from "../middlewares/authMiddleware.js";



const blogRoute = Router();
const BlogController = new blogController()

// Auth
blogRoute.get("/create", BlogController.getCreateBlog);
blogRoute.post("/cp", BlogController.postBlog);

blogRoute.get("/", BlogController.getBlogs);
blogRoute.post("/:id", );
blogRoute.get("/update", );
blogRoute.post("/delete", );



export { blogRoute }