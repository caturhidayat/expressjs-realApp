import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { PrismaClient } from "@prisma/client";
import { authenticationToken } from '../middlewares/jwt.js'


const prisma = new PrismaClient()

const userRoute = Router();
const UserController = new userController()

userRoute.get('/', UserController.getAll)
userRoute.get('/:id', authenticationToken, UserController.getSingle)
userRoute.post('/', UserController.create)
userRoute.put('/:id', authenticationToken, UserController.update)
userRoute.delete('/:id', authenticationToken, UserController.delete)

// Auth
userRoute.post('/signin', UserController.signIn)
userRoute.post('/signup', UserController.create)


// clear cookies
userRoute.post('/logout', UserController.logout)


export { userRoute }
