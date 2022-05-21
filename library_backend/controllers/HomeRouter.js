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
      .sort({ 'rating.totalRate': -1 })
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
    const result = await bookModel
      .find({})
      .sort({ 'rating.totalRate': -1 })
      .limit(5)
      .populate('author')
      .select('author');
    res.send(result);
  } catch (error) {
    return next(error);
  }
});
homeRouter.get('/topRatedbooks', async (req, res, next) => {
  try {
    const books = await BookModel.find({})
      .sort({ 'rating.totalRate': -1 })
      .limit(6)
      .populate('category')
      .populate('author');

    console.log(books);
    res.send(books);
  } catch (error) {
    next(error);
  }
});
module.exports = homeRouter;
