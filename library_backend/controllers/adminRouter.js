const Express = require('express');
const bcrypt = require('bcrypt');
const adminModel = require('./../models/adminModel');
const { jwtSignAsync, jwtVerifyAsync } = require('./../utils/jwtAsync');
const customError = require('../utils/customError');


const adminRouter = Express.Router();

const secretKey = 'I am a secret key';

const getAdminByUsernameOrEmail = async (username, email) => {
  let admin = null;
  if (username) {
    //username is not null,
    admin = await adminModel.findOne({ username });
  } else {
    admin = await adminModel.findOne({ email });
  }
  return admin;
};

adminRouter.post('/login', async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    //Error, required username or email
  }
  let admin = null;
  try {
    admin = await getAdminByUsernameOrEmail(username, email);
    if (!admin) {
      //Can't find an admin with this username or eamil
      throw customError(401, 'UNAUTHRIZED', 'Wrong Email/Username or password');
    }
    const authized = await bcrypt.compare(password, admin.hashedPassword);
    if (!authized) {
      //Return not authrized
      throw customError(401, 'UNAUTHRIZED', 'Wrong Email/Username or password');
    }
  
    //Authrized
    const token = { id: admin._id, username: admin.username, isAdmin: true };
    const signedToken = await jwtSignAsync(token, secretKey);
    res.status(200).send(signedToken);
  } catch (err) {
    //Database connection error
    //Return internal server error
    next(err);
  }
});

module.exports = adminRouter;
