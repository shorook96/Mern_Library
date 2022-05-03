const express = require('express');
const authorRouter = express.Router();
const customError = require('../utils/customError');
const authorModel = require('../models/authorModel');
authorRouter.get('/authors', async (req, res, next) => {
  try {
    const authors = await authorModel.find({});
    res.send(authors);
  } catch (err) {
    next(new customError(522, 'Server_Error', 'something went wrong'));
  }
});
authorRouter.get('/authors/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await authorModel.findById(id);
    if (!author) throw new customError(422, 'ID_NOT_FOUND', 'NO_SUCH_AUTHOR');
    res.send(author);
  } catch (err) {
    next(err);
  }
});

authorRouter.post('/authors', async (req, res, next) => {
  try {
    const { firstname, lastname, DOB, photo } = req.body;
    await authorModel.create({ firstname, lastname, DOB, photo });
    res.send({ succes: 'author added successfully' });
  } catch (err) {
    next(err);
  }
});
module.exports = authorRouter;
