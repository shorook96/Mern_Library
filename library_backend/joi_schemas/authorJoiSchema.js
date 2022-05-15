const Joi = require('@hapi/joi');


const authorSchema = Joi.object({
    firstname: Joi.string().min(1).max(50).required(),
    lastname: Joi.string().min(1).max(50).required(),
    DOB:Joi.date().iso().required(),
    photo:Joi.string().max(500).required()
});


module.exports = {authorSchema};