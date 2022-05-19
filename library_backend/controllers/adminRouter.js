const Express = require('express');
const util = require('util');
const bcrypt = require('bcrypt');
const adminModel = require('./../models/adminModel');
const { jwtSignAsync, jwtVerifyAsync } = require('./../utils/jwtAsync');

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
  } catch (err) {
    //Database connection error
    //Return internal server error
  }
  if (!admin) {
    //Can't find an admin with this username or eamil
    //Return not authrized
  }

  const authized = await bcrypt.compare(password, admin.hashedPassword);
  if (!authized) {
    //Return not authrized
    res.status(403).send({ success: false });
    return;
  }

  //Authrized
  const token = { id: admin._id, username: admin.username, isAdmin: true };
  const signedToken = await jwtSignAsync(token, secretKey);
  res.status(200).send(signedToken);
});

module.exports = adminRouter;
