const express = require('express');
const customError = require('../utils/customError');
const categoryRouter = express.Router();
const categoryModel = require('../models/categoryModel');
const {
  categoryJoiValidator_middleWare,
  uniqueCategoryNameValidator,
} = require('./../middle_wares/handling_category_middleware');
const {
  adminTokenValidatorMiddleware,
} = require('./../middle_wares/adminTokenMiddleware_validator');
const req = require('express/lib/request');

categoryRouter.use(adminTokenValidatorMiddleware);
categoryRouter.use(categoryJoiValidator_middleWare);
categoryRouter.use(uniqueCategoryNameValidator);

categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await categoryModel.find({});
    res.send(categories);
  } catch (err) {
    next(err);
  }
});
categoryRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById({ _id: id });
    if (!category) throw customError(422, 'ID_NOT_FOUND', 'NO_SUCH_CATEGORY');
    res.send(category);
  } catch (err) {
    next(err);
  }
});

categoryRouter.post('/', async (req, res, next) => {
  try {
    if(!req.isActive){
      throw customError(404, 'FORBIDDEN', "Account is inactive, activate your account first");
    }
    const { categoryName } = req.body;
    await categoryModel.create({ categoryName });
    res.send({ succes: 'category created successfully' });
  } catch (err) {
    next(err);
  }
});
categoryRouter.patch('/:id', async (req, res, next) => {
  try {
    if(!req.isActive){
      throw customError(404, 'FORBIDDEN', "Account is inactive, activate your account first");
    }
    const { id: _id } = req.params;
    const { categoryName } = req.body;
    await categoryModel.findByIdAndUpdate({ _id }, { $set: { categoryName } });
    res.status(200).send({ success: 'Category Updated successfully' });
  } catch (err) {
    next(err);
  }
});

categoryRouter.delete('/:id', async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    if(!req.isActive){
      throw customError(404, 'FORBIDDEN', "Account is inactive, activate your account first");
    }
    await categoryModel.deleteOne({ _id });
    res.send({ success: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRouter;
