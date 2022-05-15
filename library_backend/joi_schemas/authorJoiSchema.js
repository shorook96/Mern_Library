const Joi = require('@hapi/joi');


const authorSchema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    DOB:Joi.date().iso().required(),
    photo:Joi.string.max(500).required()
});


module.exports = {authorSchema};