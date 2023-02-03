import { Router } from "express";
import { userController } from "../controllers/userController.js";

const UserController = new userController()
const main = Router();

main.get("/", async (req, res) => {
    res.render('index');
});

// Auth
main.get('/login', UserController.loginPage)
main.get('/signup', UserController.signUpPage)
main.post('/login', UserController.login)
main.post('/signup', UserController.create)

export { main };
