import Joi from "joi";

const authSchema = Joi.object({
    name: Joi.string().required().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().min(5)
})


export default authSchema;