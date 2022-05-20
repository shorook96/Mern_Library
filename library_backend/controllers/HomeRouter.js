const express = require('express');
const homeRouter = express.Router();
const bookModel = require('../models/bookModel');
const categoryModel = require('../models/categoryModel');
const authorModel = require('../models/authorModel');
const BookModel = require('../models/bookModel');
const mongoose = require('mongoose');

homeRouter.get('/topRatedCategories', async (req, res, next) => {
  try {
    const result = await bookModel
      .find({})
      .sort({ 'rating': -1 })
      .limit(5)
      .populate('category')
      .select('category');
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

homeRouter.get('/topRatedAuthors', async (req, res, next) => {
  try {
    const authorIds = await bookModel
      .find({})
      .sort({ rating: -1 })
      .limit(5)
      .distinct('author');
    const authorObjectIds = authorIds.map((val) =>
      mongoose.Types.ObjectId(val)
    );
    const result = await authorModel.find({
      _id: {
        $in: authorObjectIds,
      },
    });
    res.send(result);
  } catch (error) {
    return next(error);
  }
});
homeRouter.get('/topRatedbooks', async (req, res, next) => {
  try {
    const books = await BookModel.find({})
      .sort({ rating: -1 })
      .limit(6)
      .populate('category')
      .populate('author');
    res.send(books);
  } catch (error) {
    next(error);
  }
});
module.exports = homeRouter;
