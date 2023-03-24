import Joi from "joi";

const blogPost = Joi.object({
    tittle: Joi.string().required().min(5),
    content: Joi.string().required(),
})



export { blogPost };