import { Router } from "express";
import { userController } from "../controllers/userController.js";

const UserController = new userController()
const main = Router();

main.get("/", async (req, res) => {
    res.render('index');
});

// Auth
main.get('/signin', UserController.signInPage)
main.get('/signup', UserController.signUpPage)
main.post('/signin', UserController.signIn)
main.post('/signup', UserController.create)

export { main };
