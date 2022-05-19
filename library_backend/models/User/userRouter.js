const util = require('util');
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const { customError } = require('../../utils/customError');
const UserModel = require('./userModel');
const BookModel = require('../bookModel');
const AuthorModel = require('../authorModel');
const categoryModel = require('../categoryModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const signAsync = util.promisify(jwt.sign);
// const secretKey = process.env.SECRET_KEY;
const {
  authorizedUser,
} = require('../../middle_wares/authorization_middleware');
const { appendFile } = require('fs');

const secretKey = 'zahra';

userRouter.post('/signup', async (req, res, next) => {
  const { Fname, Lname, email, password, URL } = req.body;
  try {
    const checkUserExisted = await UserModel.findOne({ email });
    if (checkUserExisted) {
      const error = customError(
        410,
        'User Already Exist ',
        'User Already Exist'
      );
      // throw error;

      return next(error);
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      firstname: Fname,
      lastname: Lname,
      email: email,
      password: hashedPassword,
      image: URL,
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
    if(!user) throw customError(405,"Email or Password may be wrong","Email or Password may be wrong");
    const result = await bcrypt.compare(password, user.password);
    if(!result)throw customError(405,"Email or Password may be wrong","Email or Password may be wrong");
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

userRouter.get(
  '/:id/books/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { pageNumber } = req.params;
      

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
      const books = (await BookModel.find({}).skip(skipNumber).limit(2)) || [];
      const booksCount = await BookModel.find({}).count();
      
      res.send({ books, booksCount });
    } catch (error) {
      next(error);
    }
  }
);


userRouter.get(
  '/:id/categories/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { pageNumber } = req.params;
      

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
      const categories = (await categoryModel.find({}).skip(skipNumber).limit(2)) || [];
      const CategoriesCount = await categoryModel.find({}).count();
      

      res.send({ categories, CategoriesCount });
    } catch (error) {
      next(error);
    }
  }
);


userRouter.get(
  '/:id/authors/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { pageNumber } = req.params;
      

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
      const authors = (await AuthorModel.find({}).skip(skipNumber).limit(2)) || [];
      const authorsCount = await AuthorModel.find({}).count();
      

      res.send({ authors, authorsCount });
    } catch (error) {
      next(error);
    }
  }
);



userRouter.get(
  '/:id/myBooks/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { id, pageNumber } = req.params;
    

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
        
      const books = (await UserModel.findById(id));
     
      // const booksCount = await UserModel.find({}).count();
      

      res.send( books );
    } catch (error) {
      next(error);
    }
  }
);


userRouter.post(
  '/:id/book',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id, state }= req.body
      console.log(_id)
      const book = _id
      await UserModel.findByIdAndUpdate(
        id, 
        { $push: { books: {book, state}} },
        function (error, success) {
          if (error) {
              console.log(error);
          } else {
              console.log(success);
          }
      }
    );
      res.send({success: true});
    } catch (error) {
      next(error);
    }
  }
);




module.exports = userRouter;
