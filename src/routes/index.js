import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/userController.js";
import { authenticationToken } from "../middlewares/jwt.js";

const UserController = new userController();
const main = Router();

main.get("/", async (req, res, next) => {
    res.render("index", { tittle: "Home Page" });
});

// Auth
main.get("/login", UserController.loginPage);
main.get("/signup", UserController.signUpPage);
main.post("/login", UserController.login);
main.post("/signup", UserController.create);

// Profile
main.get("/profile", UserController.profile);

export { main };
