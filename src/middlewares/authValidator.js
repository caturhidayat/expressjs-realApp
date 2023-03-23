import Joi from "joi";

const authSignup = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().min(5)
})

const authLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


export { authSignup, authLogin };