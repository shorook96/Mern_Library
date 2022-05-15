const util = require('util');
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const { customError } = require('../../utils/customError');
const UserModel = require('./userModel');
const jwt = require('jsonwebtoken');
// const { authorizeUser } = require('./middlewares');
const signAsync = util.promisify(jwt.sign);
// const secretKey = process.env.SECRET_KEY;
const secretKey = 'zahra';

userRouter.post('/signup', async (req, res, next) => {
  const { Fname, Lname, email, password } = req.body;
  try {
    const checkUserExisted = await UserModel.findOne({ email });
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    if (checkUserExisted) {
      console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      const error = customError(
<<<<<<< HEAD
        200,
        'User Already Exist ',
        'User Already Exist'
      );
      throw error;
=======
        410,
        'User Already Exist ',
        'User Already Exist'
      );
      return next(error);
>>>>>>> 4e14e49d8b4835fa54b9df40992aee869eddcc22
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
      fname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token,
    };
    // res.send(user)
    res.send({ userInfo });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
