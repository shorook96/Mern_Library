const Express = require('express');
const bcrypt = require('bcrypt');
const passwordGenerator = require('generate-password');
const adminModel = require('./../models/adminModel');
const { jwtSignAsync } = require('./../utils/jwtAsync');
const customError = require('../utils/customError');
const { adminTokenValidatorMiddleware } = require('../middle_wares/adminTokenMiddleware_validator');
const mailer = require('../utils/mailer');
const {secretKey, saltRounds} = require('../utils/globalVariablesAndFunctions');
const {adminFrontEndhostname} = require('../utils/globalVariablesAndFunctions');
const {adminActivateMiddlewareValidator, adminCreateMiddlewareValidator} = require('../middle_wares/adminMiddleWareValidators')
const adminRouter = Express.Router();




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
  try {
    const { username, email, password } = req.body;
    if (!(username || email)) {
      //Error, required username or email
      throw customError(401, 'UNAUTHNTICATED', 'Email or username is required');
    }
    let admin = null;
    admin = await getAdminByUsernameOrEmail(username, email);
    if (!admin) {
      //Can't find an admin with this username or eamil
      throw customError(401, 'UNAUTHNTICATED', 'Wrong Email/Username or password');
    }
    const authinticated = await bcrypt.compare(password, admin.hashedPassword);
    if (!authinticated) {
      //Return not Authinticated
      throw customError(401, 'UNAUTHNTICATED', 'Wrong Email/Username or password');
    }
  
    //Authinticated
    const token = { id: admin._id, username: admin.username, isAdmin: true, isActive: admin.isActive };
    const signedToken = await jwtSignAsync(token, secretKey);
    const resBody = {
      token: signedToken,
      isAdmin: true,
      isActive: admin.isActive
    }
    res.status(200).send(resBody);
  } catch (err) {
    //Database connection error
    //Return internal server error
    next(err);
  }
});

adminRouter.use('/', adminTokenValidatorMiddleware);

adminRouter.use('/', adminCreateMiddlewareValidator);
adminRouter.post('/', async (req, res, next) => {
  try{
    if(!req.isActive){
      throw customError(401, 'INACTIVE_ADMIN', 'Please activate your account first');
    }
    const body = req.body;
    const {email, username} = body;
    const adminsWithSameData = await adminModel.countDocuments({$or: [{email}, {username}]});
    if(adminsWithSameData > 0){
      //an admin with same username or password exists
      throw customError(409, 'CONFLICT', 'An admin exists with smae email or password.');
    }
    const tempPassword = passwordGenerator.generate({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true,
      strict: true
    });
    
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);
    await adminModel.create({
      username: body.username,
      email: body.email,
      isActive: false,
      hashedPassword
    });
    const msg =     `Greetings, ${body.username}\n\n` 
                  + `Your admin account have been created but needs to be activated.\n`
                  + `Use this password:"${tempPassword}" to activate it. go to ${adminFrontEndhostname} and login using this password then activate your account.\n\n`
                  + `PS: the password is without the double quets ""\n\n\n`
                  + 'Good Reads Team.\n';
  
    await mailer.sendEmail({
      to: body.email,
      subject: 'Good Reads New Admin Account',
      text: msg
    });
    res.status(201).send({
      success: true,
      message: 'Account Created Successfully' 
    });
  }catch(error){
    next(error);
  }
});

adminRouter.use('/activate', adminActivateMiddlewareValidator);
adminRouter.post('/activate', async (req, res, next) => {
  try{
    if(req.isActive){
      throw customError(404, 'FORBIDDEN', 'Your account is already active');
    }
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    await adminModel.findByIdAndUpdate(req.adminId, {isActive: true, hashedPassword});
    const admin = await adminModel.findById(req.adminId);
    await mailer.sendEmail({
      to: admin.email,
      subject: 'Good Reads | Account Activation',
      text: `Congratulations ${admin.username}\n\n Your account has been avtivated succesfully.`
    })
    res.status(200).send({success: true, message: 'Accont Acctivated Successfully'});
    
  }catch(error){
    next(error)
  }
})


adminRouter.get('/', async (req, res, next) => {
  try{
    if(!req.isActive){
      throw customError(404, 'FORBIDDEN', 'Your Account is inactive, ativate your account first')
    }
    const admins = await adminModel.find({}, {email: true, username: true, isActive: true});
    res.status(200).send(admins);
  }catch(error){
    next(error)
  }
});


adminRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    if(!req.isActive){
      throw customError(404, 'FORBIDDEN', "Account is inactive, activate your account first");
    }
    if(_id === req.adminId){
      throw customError(404, 'FORBIDDEN', "Can't delete yourself");
    }
    await adminModel.deleteOne({ _id });
    res.send({ success: 'Admin deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = adminRouter;
