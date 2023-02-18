import { Router } from "express";
import { authController } from "../controllers/authController.js";
import jwt from "jsonwebtoken";


const AuthController = new authController();
const authRoute = Router();

// Auth
authRoute.get("/signup", AuthController.getSignup);
authRoute.post("/signup", AuthController.postSignup);
authRoute.get("/login", AuthController.getLogin);
authRoute.post("/login", AuthController.postLogin);

// Profile
authRoute.get("/profile", AuthController.getProfile);

authRoute.get("/create-cookie", (req, res) => {
    const user = 'this user'
    const secret = process.env.SECRET_KEY
    const token = jwt.sign({ user }, 'secret', { expiresIn: 1000 * 60 * 60})
    res.send(token)
});
authRoute.get("/get-cookies", AuthController.getProfile);

export { authRoute };
