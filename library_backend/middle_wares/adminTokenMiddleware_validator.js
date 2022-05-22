const {jwtVerifyAsync} = require('./../utils/jwtAsync');
const customError = require('../utils/customError');

const secretKey = "I am a secret key";


const adminTokenValidatorMiddleware = async (req, res, next) => {
    //Apply on any method except for GET method
    if(req.method == 'GET'){
        next();
        return;
    }
    const token = req.headers.token;
    try{
        const decoded = await jwtVerifyAsync(token, secretKey);
        if(decoded.isAdmin){
            next();
        }else{
            throw customError(401, '401 Unauthorized', 'Not Authrized');
        }
    }catch(error){
        if(!error.status){
            error = customError(401, 'NOT_AUTHRIZED', 'Not an authrized user');
        }
        next(error);
    }
}

module.exports = {adminTokenValidatorMiddleware};