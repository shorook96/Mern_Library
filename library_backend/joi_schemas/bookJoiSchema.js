const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
    bookName:Joi.string.max(100).required(),
    rating: Joi.number().min(0).max(100),
    photo:Joi.string.max(500).required(),
    category:Joi.string().required(),
    author:Joi.string().required()
});

module.exports = {bookSchema};