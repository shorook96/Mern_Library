const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
    bookName:Joi.string().min(1).max(100).required(),
    brief: Joi.string().min(1).max(1000).required(),
    photo:Joi.string().min(1).max(500).required(),
    category:Joi.string().min(1).max(50).alphanum().required(),
    author:Joi.string().min(1).max(50).alphanum().required()
});

module.exports = {bookSchema};