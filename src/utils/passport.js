import { auth } from "./auth.js";
import passport from "passport";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../prisma/prismaConnection.js";
const hassPass = new auth();

passport.use(
    "signup",
    new LocalStrategy(
        { usernameField: "email" },
        async (name, email, password, done) => {
            const hash = await auth.hassPassword(passport);

            try {
                const user = await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: hash,
                    },
                });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { email: email },
                });
                if (!user)
                    return done(null, false, {
                        message: `Email or Password Wrong 🔥`,
                    });

                const match = await auth.comparePassword(
                    password,
                    user.password
                );

                if (!match)
                    return done(null, false, {
                        message: `Email or Password Wrong 🔥`,
                    });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter(
                process.env.SECRET
            ),
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return done("No User to deserialize");

    return done(null, user);
});

export const isLoggedIn = (req, res, next) => {
    if (req.user) return next();

    res.status(401);
};
