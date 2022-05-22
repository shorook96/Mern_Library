const express = require('express');
const authorRouter = express.Router();
const customError = require('../utils/customError');
const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');
const {
  adminTokenValidatorMiddleware,
} = require('../middle_wares/adminTokenMiddleware_validator');
const {
  authorJoiValidator_middleWare,
} = require('../middle_wares/handling_author_middleware');

// authorRouter.use(adminTokenValidatorMiddleware);
authorRouter.use(authorJoiValidator_middleWare);

authorRouter.get('/', async (req, res, next) => {
  try {
    const authors = await authorModel.find({});
    console.log("authordfgvhbjnkmlkjhgfds")
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
    if (!author) throw customError(422, 'ID_NOT_FOUND', 'NO_SUCH_AUTHOR');
    res.send(author);
  } catch (err) {
    next(err);
  }
});

authorRouter.get('/books/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await authorModel.findById(id);
    if (!author) throw customError(422, 'ID_NOT_FOUND', 'NO_SUCH_BOOK');
    console.log(author)
    const books= await bookModel.find({author:id})
    res.send(books);
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
    authorModel.deleteOne(
      {
        _id: id,
      },
      (err, output) => {
        if (!err) {
          res.send(output);
        } else {
          res.send(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
});

authorRouter.patch('/:id', async (req, res, next) => {
  let _id = req.params.id;
  const newAuthorData = req.body;
  try {
    const exists = await authorModel.findById({ _id });
    if (!exists) {
      throw customError(400, 'NOT_FOUND', 'No such Author');
    }

    await authorModel.findOneAndUpdate({ _id }, newAuthorData);
    res.send({ success: 'author updated successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = authorRouter;
