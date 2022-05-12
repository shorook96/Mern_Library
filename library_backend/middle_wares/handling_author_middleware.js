const {authorSchema} = require('./../joi_schemas/authorJoySchema');
const authorModel = require('./../models/authorModel');
const customError = require('../utils/customError');

const authorJoiValidator_middleWare = async (req, res, next) => {
    //Done on PATCH and POST methods only
    if(!(req.method === 'POST' || req.method === 'PATCH')){
        next();
        return; // Early return;
    }

    const body = req.body;
    let validatedBody = {};
    try{
        validatedBody = await authorSchema.validateAsync(body);
        req.body = validatedBody;
        next();
    }catch(err){
        if(err.isJoi){
            err.status = 422;
        }
        next(err);
    }
}

module.exports = {authorJoiValidator_middleWare};