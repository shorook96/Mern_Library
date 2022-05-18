const util = require('util');
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const { customError } = require('../../utils/customError');
const UserModel = require('./userModel');
const BookModel = require('../bookModel');
const AuthorModel = require('../authorModel');

const jwt = require('jsonwebtoken');
const signAsync = util.promisify(jwt.sign);
// const secretKey = process.env.SECRET_KEY;
const {
  authorizedUser,
} = require('../../middle_wares/authorization_middleware');
const { appendFile } = require('fs');

const secretKey = 'zahra';
userRouter.post('/signup', async (req, res, next) => {
  const { Fname, Lname, email, password } = req.body;
  try {
    const checkUserExisted = await UserModel.findOne({ email });
    if (checkUserExisted) {
      const error = customError(
        410,
        'User Already Exist ',
        'User Already Exist'
      );
      throw error;

      return next(error);
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      firstname: Fname,
      lastname: Lname,
      email: email,
      password: hashedPassword,
    });
    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // if(!user) throw authError;
    const result = await bcrypt.compare(password, user.password);
    // if(!result)throw authError;
    const SecretKey = 'zahra';
    const token = await signAsync(
      {
        id: user._id,
        admin: false,
      },
      SecretKey
    );
    const userInfo = {
      id: user._id,
      fname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      image: user.image,
      books: user.books,
      authorization: token,
    };
    // res.send(user)
    res.send({ userInfo });
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/:id/search/:searchField',
  authorizedUser,
  async (req, res, next) => {
    try {
      const searchField = req.params.searchField;

      let searchResults = [];

      booksResults = await BookModel.find({
        bookName: { $regex: searchField, $options: '$i' },
      });
      authorsResults = await AuthorModel.find({
        firstname: { $regex: 'z', $options: '$i' },
      });
      searchResults = [booksResults, authorsResults];
      console.log(searchResults);
      res.send(searchResults);
    } catch (error) {
      next(error);
    }
  }
);
userRouter.get('/:id/books/count', authorizedUser, async (req, res, next) => {
  try {
    const booksCount = await BookModel.find({}).count();
    console.log(' books ooooooooooooooooooooooo' + booksCount);
    res.send({ booksCount });
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/:id/books/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { pageNumber } = req.params;
      console.log(`page numnber is ${pageNumber}`);
      const skipNumber = +pageNumber === 1 ? 0 : Number(pageNumber) * 6 - 6;
      const books = (await BookModel.find({}).skip(skipNumber).limit(6)) || [];
      const booksCount = await BookModel.find({}).count();
      console.log(`Books are ${books}`);
      console.log(searchResults);
      res.send({ books, booksCount });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
