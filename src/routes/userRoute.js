import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const userRoute = Router();
const UserController = new userController()

userRoute.get('/', UserController.getAll)
userRoute.get('/:id', UserController.getSingle)
userRoute.post('/', UserController.create)
userRoute.put('/:id', UserController.update)
userRoute.delete('/:id', UserController.delete)

// Auth
userRoute.post('/signin', UserController.signIn)


export { userRoute }