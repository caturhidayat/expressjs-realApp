import { Router } from "express";

const userRoute = Router();

userRoute.get('/', (req, res) => {
    res.send(`Get All User`)
})
userRoute.get('/:id', (req, res) => {
    res.send(`Get One User : ${req.params.id}`)
})
userRoute.post('/', (req, res) => {
    res.send(`Create User`)
})
userRoute.put('/:id', (req, res) => {
    res.send(`Update User : ${req.params.id}`)
})
userRoute.delete('/:id', (req, res) => {
    res.send(`Delete User : ${req.params.id}`)
})


export { userRoute }