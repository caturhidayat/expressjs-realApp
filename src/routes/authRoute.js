import { Router } from "express";

const authRoute = Router()

// Auth
authRoute.get('/signup', (req, res) => {
    res.render('signup')
})
authRoute.post('/signup', )
authRoute.get('/login', )
authRoute.post('/login', )

// Profile
authRoute.get('/profile', )

export { authRoute }