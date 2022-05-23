const Joi = require('@hapi/joi');


const authorSchema = Joi.object({
    firstname: Joi.string().min(1).max(50).required(),
    lastname: Joi.string().min(1).max(50).required(),
    DOB:Joi.date().iso().required(),
    bio: Joi.string().min(1).max(1000).required(),
    photo:Joi.string().max(500).required()
});


module.exports = {authorSchema};