const express = require('express');
const authorRouter = express.Router();
const customError = require('../utils/customError');
const authorModel = require('../models/authorModel');

authorRouter.get('/', async (req, res, next) => {
  try {
    const authors = await authorModel.find({});
    res.send(authors);
  } catch (err) {
    console.log(err);
    next(customError(522, 'Server_Error', 'something went wrong'));
  }
});


authorRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await authorModel.findById(id);
    if (!author) throw  customError(422, 'ID_NOT_FOUND', 'NO_SUCH_AUTHOR');
    res.send(author);
  } catch (err) {
    next(err);
  }
});

authorRouter.post('/', async (req, res, next) => {
  try {
    const { firstname, lastname, DOB, photo } = req.body;
    await authorModel.create({ firstname, lastname, DOB, photo });
    res.send({ succes: 'author added successfully' });
  } catch (err) {
    next(err);
  }
});

authorRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await authorModel.deleteOne(
      {
        _id: id,
      }, (err, output) => {
        if (!err) {
          res.send(output);
        }
        else {
          res.send(err)
        }
      }
    )
  } catch (err) {
    next(err);
  }
})

module.exports = authorRouter;
