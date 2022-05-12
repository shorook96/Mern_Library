const {bookSchema} = require('./../joi_schemas/bookJoySchema');
const bookModel = require('./../models/bookModel');
const customError = require('../utils/customError');

const bookJoiValidator_middleWare = async (req, res, next) => {
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

const uniqueBookNameValidator = async (req, res, next) => {
    //Done on POST mehtod only
    if(req.method !== 'POST'){
        next();
        return; // Early return;
    }

    const {bookName} = req.body;
    try{
        const book = await bookModel.findOne({bookName});
        if(book){
            //Custom Error
            throw customError(409, 'DUPLICATE_ENTITY', '409 Error! Book name exists');
        }else{
            next();
        }
    }catch(error){
        next(error)
    }
}

module.exports = {bookJoiValidator_middleWare, uniqueBookNameValidator};