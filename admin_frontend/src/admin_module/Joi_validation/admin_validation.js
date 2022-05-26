const Joi = require('joi');


const newAdminSchema = Joi.object({
    username: Joi.string().min(1).max(200).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
});

module.exports = {newAdminSchema}