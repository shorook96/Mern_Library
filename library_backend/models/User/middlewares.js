// const util = require('util');
// const jwt = require('jsonwebtoken');
// const { authorizationError } = require('../helpers/customError');

// const verifyAsync = util.promisify(jwt.verify);
// const secretKey = "zahra";

// exports.authorizeUser = async ( req, res, next ) => {
//     const { authorization: token } = req.headers;
//     const { id } = req.params;
//     try {
//         const payload = await verifyAsync(token, secretKey);
//         if(id !== payload.id) throw authorizationError;
//     } catch (error) {
//         next(authorizationError);
//     }
//     next();
// };