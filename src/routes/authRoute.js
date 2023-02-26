import { Router } from "express";
import { authController } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middlewares/authMiddleware.js";

const AuthController = new authController();
const authRoute = Router();

// Auth
authRoute.get("/signup", AuthController.getSignup);
authRoute.post("/signup", AuthController.postSignup);
authRoute.get("/login", AuthController.getLogin);
authRoute.post("/login", AuthController.postLogin);

// Logout
authRoute.get('/logout', AuthController.getLogout)

// Profile
authRoute.get("/profile", requireAuth, AuthController.getProfile);

authRoute.get("/create-cookie", (req, res) => {
    const user = 'this user'
    const secret = process.env.SECRET_KEY
    const token = jwt.sign({ user }, 'secret', { expiresIn: 1000 * 60 * 60})
    res.send(token)
});
authRoute.get("/get-cookies", (req, res) => {
    const token = req.cookies
    res.send(token)
});

export { authRoute };
