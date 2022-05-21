const util = require('util');
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const { customError } = require('../../utils/customError');
const UserModel = require('./userModel');
const BookModel = require('../bookModel');
const AuthorModel = require('../authorModel');

const categoryModel = require('../categoryModel');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const signAsync = util.promisify(jwt.sign);
// const secretKey = process.env.SECRET_KEY;
const {
  authorizedUser,
} = require('../../middle_wares/authorization_middleware');
const { appendFile } = require('fs');
const bookModel = require('../bookModel');

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
    if (!user)
      throw customError(
        405,
        'Email or Password may be wrong',
        'Email or Password may be wrong'
      );
    const result = await bcrypt.compare(password, user.password);
    if (!result)
      throw customError(
        405,
        'Email or Password may be wrong',
        'Email or Password may be wrong'
      );
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
      }).limit(3);
      authorsResults = await AuthorModel.find({
        firstname: { $regex: searchField, $options: '$i' },
      }).limit(3);
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
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
      const books = (await BookModel.find({}).skip(skipNumber).limit(6)) || [];
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
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
      const categories =
        (await categoryModel.find({}).skip(skipNumber).limit(6)) || [];
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
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
      const authors =
        (await AuthorModel.find({}).skip(skipNumber).limit(6)) || [];
      const authorsCount = await AuthorModel.find({}).count();

      res.send({ authors, authorsCount });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get('/:id/myBooks/', authorizedUser, async (req, res, next) => {
  try {
    const { id, pageNumber } = req.params;

    // const skipNumber =
    //   Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;

    const user = await UserModel.findById(id)
      .populate({
        path: 'books.book',
      })
      .limit(6)
      .select('books.state books.userRating book');
    const allMybooks = user.books;
    // booksPerPage = books.books.slice(skipNumber, skipNumber + 2);
    // console.log(booksPerPage.length);
    const booksCount = user.books.length;
    res.send({ allMybooks, booksCount });
  } catch (error) {
    next(error);
  }
});
// /**************************** */
// userRouter.get('/:id/myReadBooks/:pageNumber', async (req, res, next) => {
//   try {
//     const { id, pageNumber } = req.params;

//     const skipNumber =
//       Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;

//     const books = await UserModel.findOne({
//       _id: id,
//     })
//       .where('books')
//       .elemMatch('books', {
//         state: 'Want To Read',
//       });
//     // .populate({
//     //   path: 'books.book',
//     //   $options: { limit: 2, skip: skipNumber },
//     // })
//     // .limit(2)
//     // .select('books.state book');
//     // booksPerPage = books.books.slice(skipNumber, skipNumber + 2);
//     // console.log(booksPerPage);
//     // const booksCount = books.books.length;
//     res.send({ books });
//   } catch (error) {
//     next(error);
//   }
// });
/************************************** */
userRouter.patch('/:id/book', authorizedUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('my id is ' + id);
    const { addedBook } = req.body;

    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { books: { book: addedBook.book } } }
    );

    res.send({ success: 'true' });
  } catch (error) {
    next(error);
  }
});
userRouter.patch(
  '/:id/mybook/:bookId',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { id, bookId } = req.params;
      const { state } = req.body;
      console.log(state);
      console.log('my id is ' + id);
      const user = await UserModel.updateOne(
        {
          _id: id,
          'books.book': bookId,
        },
        { $set: { 'books.$.state': state } }
      );
      console.log(user);
      res.send({ success: 'true' });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch('/:id/mybook/rate/:bookId', async (req, res, next) => {
  try {
    const { id, bookId } = req.params;
    const { rate } = req.body;
    const user = await UserModel.findOne(
      {
        _id: id,
        'books.book': bookId,
      },
      {
        'books.$': 1,
      }
    );
    //user changed rate to same value
    if (rate === user.books[0].userRating) {
      return res.send({ success: 'true ' });
    }
    const book = await BookModel.findById(bookId);

    //user changes rate rate to same value

    if (user.books[0].userRating) {
      const changeCalculateRating =
        book.rating.totalRate - user.books[0].userRating + rate;
      const result = await BookModel.findByIdAndUpdate(bookId, {
        $set: {
          rating: {
            totalRate: changeCalculateRating,
            numberOfRates: book.rating.numberOfRates,
          },
        },
      });
      const changedUser = await UserModel.updateOne(
        {
          _id: id,
          'books.book': bookId,
        },
        { $set: { 'books.$.userRating': rate } }
      );
      console.log(user);
      return res.send({ success: 'true' });
    }
    const calculateRating = book.rating.totalRate + rate;
    const numberOfIncrements = book.rating.numberOfRates + 1;
    const result = await BookModel.findByIdAndUpdate(bookId, {
      $set: {
        rating: {
          totalRate: calculateRating,
          numberOfRates: numberOfIncrements,
        },
      },
    });

    const submittedUser = await UserModel.updateOne(
      {
        _id: id,
        'books.book': bookId,
      },
      { $set: { 'books.$.userRating': rate } }
    );
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/:id/booksofCategory/:categoryId/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { categoryId, pageNumber } = req.params;

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 6 - 6;
      const books =
        (await BookModel.find({ category: categoryId })
          .skip(skipNumber)
          .limit(6)) || [];
      const booksCount = await BookModel.find({ category: categoryId }).count();

      res.send({ books, booksCount });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  '/:id/booksofAuthor/:authorId/:pageNumber',
  authorizedUser,
  async (req, res, next) => {
    try {
      const { authorId, pageNumber } = req.params;

      const skipNumber =
        Number(pageNumber) === 1 ? 0 : Number(pageNumber) * 2 - 2;
      const books =
        (await BookModel.find({ author: authorId })
          .skip(skipNumber)
          .limit(2)) || [];
      const booksCount = await BookModel.find({ author: authorId }).count();

      res.send({ books, booksCount });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
