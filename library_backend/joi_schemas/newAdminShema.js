const Joi = require('@hapi/joi');


const newAdminSchema = Joi.object({
    username: Joi.string().min(1).max(50).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});


module.exports = {newAdminSchema};