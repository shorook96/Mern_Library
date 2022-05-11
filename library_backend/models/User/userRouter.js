const util = require('util');
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const {customError } = require('../../utils/customError');
const UserModel = require('./userModel');
const jwt = require('jsonwebtoken');
// const { authorizeUser } = require('./middlewares');
const signAsync = util.promisify(jwt.sign);
// const secretKey = process.env.SECRET_KEY;
const secretKey = "zahra";


userRouter.post('/signup', async (req, res, next) => {
    const {Fname, Lname, email, password} = req.body;

    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({firstname:Fname,lastname:Lname,email:email, password: hashedPassword})
        res.send({success: true});
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;