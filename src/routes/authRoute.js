import { Router } from "express";
import passport from "passport";

const authRoute = Router();

// Auth
authRoute.get("/signup", (req, res) => {
    res.render("signup");
});
authRoute.post("/signup");
authRoute.get("/login");
authRoute.post("/login");

// Profile
authRoute.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send(req.user)
    }
);

export { authRoute };
