const Joi = require('@hapi/joi');

const authorSchema = Joi.object({
    bookName:Joi.string.max(100).required,
    photo:Joi.string.max(100).required,
    category:Joi.required,
    author:Joi.required,
})