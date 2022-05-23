const Joi = require('joi');


const categorySchema = Joi.object({
    categoryName: Joi.string().min(1).max(200).required()
});

module.exports = {categorySchema}