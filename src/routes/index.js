import { Router } from "express";
import { blogController } from "../controllers/blogController.js";
const BlogController = new blogController()

const main = Router();

main.get("/", BlogController.getHome);
main.get("/article/:id", BlogController.getBlog);

export { main };
