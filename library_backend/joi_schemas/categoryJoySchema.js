const Joi = require('@hapi/joi');


const categorySchema = Joi.object({
    categoryName: Joi.string().max(200).required()
});


module.exports = {categorySchema};