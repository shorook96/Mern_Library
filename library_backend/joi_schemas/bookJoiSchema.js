const Joi = require('@hapi/joi');

const bookSchema = Joi.object({
    bookName:Joi.string().max(100).required(),
    brief: Joi.string().min(1).max(1000).required(),
    photo:Joi.string().max(500).required(),
    category:Joi.string().required(),
    author:Joi.string().required()
});

module.exports = {bookSchema};


///newAvgRating = ((oldAvgRating * oldRatingCount - userOldrRating + userNewRating)) / (newRatingCount)

