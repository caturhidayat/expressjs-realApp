import { Router } from "express";
import passport from "passport";
import { authController } from '../controllers/authController.js'

const AuthController = new authController()
const authRoute = Router();

// Auth
authRoute.get("/signup", AuthController.getSignup);
authRoute.post("/signup", AuthController.postSignup);
authRoute.get("/login", AuthController.getLogin);
authRoute.post("/login", AuthController.postLogin);

// Profile
authRoute.get(
    "/profile",
    // passport.authenticate("jwt", { session: false }),
    AuthController.getProfile
);

export { authRoute };
