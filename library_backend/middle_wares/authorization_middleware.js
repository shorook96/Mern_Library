const util = require('util');
const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');

const verifyAsync = util.promisify(jwt.verify);
const secretKey = 'zahra';

exports.authorizedUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const payload = await verifyAsync(authorization, secretKey);
    if (id !== payload.id)
      throw customError(403, 'NOT AUTHORIZED', 'Not Authorized User');
  } catch (error) {
    return next(error);
  }
  next();
};
