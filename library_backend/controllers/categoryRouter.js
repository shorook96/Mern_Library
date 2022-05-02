const express = require('express');
const customError = require('../utils/customError');
const categoryRouter = express.Router();
const categoryModel = require('../models/categoryModel');
categoryRouter.get('/categories', async (req, res, next) => {
  try {
    const categories = await categoryModel.find({});
    res.send(categories);
  } catch (err) {
    next(new customError(522, 'Server_Error', 'something went wrong'));
  }
});
categoryRouter.get('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category)
      throw new customError(422, 'ID_NOT_FOUND', 'NO_SUCH_CATEGORY');
    res.send(category);
  } catch (err) {
    next(err);
  }
});

categoryRouter.post('/categories', async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    await categoryModel.create({ categoryName });
    res.send({ succes: 'category created successfully' });
  } catch (err) {
    next(err);
  }
});
categoryRouter.patch('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.params;
    await categoryModel.findByIdAndUpdate(_id, { $set: { categoryName } });
  } catch (err) {
    next(err);
  }
});
