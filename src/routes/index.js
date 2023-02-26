import { Router } from "express";
import { authController } from '../controllers/authControllers.js'
import { isLoggedIn } from "../middlewares/jwt.js";

// const UserController = new userController();
const AuthController = new authController()
const main = Router();

main.get("/", (req, res) => {
  res.render('index', { meessage: 'Bulma ⚡️'});
});

// Auth Loggin
main.get("/login", AuthController.loginGet);
main.post("/login", AuthController.loginPost);

// Auth Signup
main.get("/signup", AuthController.signupGet);
main.post("/signup", AuthController.signupPost);

// Profile
main.get("/profile", AuthController.profile);

export { main };
