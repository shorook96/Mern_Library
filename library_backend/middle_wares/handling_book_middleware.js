const {bookSchema} = require('./../joi_schemas/bookJoiSchema');
const bookModel = require('./../models/bookModel');
const customError = require('../utils/customError');
const authorModel = require('../models/authorModel');
const categoryModel = require('../models/categoryModel');

const bookJoiValidator_middleWare = async (req, res, next) => {
    //Done on PATCH and POST methods only
    if(!(req.method === 'POST' || req.method === 'PATCH')){
        next();
        return; // Early return;
    }

    const body = req.body;
    let validatedBody = {};
    try{
        validatedBody = await bookSchema.validateAsync(body);
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
    if(!(req.method === 'POST' ||  req.method === 'PATCH')){
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

const references_middleware_validator = async (req, res, next) =>  {
    const bookData = req.body;
    try{
        const author = await authorModel.findOne({_id: bookData.author});
        const category = await categoryModel.findOne({_id: bookData.category});
        if(!author){
            throw customError(409, 'AUTHOR_REF_ERROR', 'No such autor');
        }
        if(!category){
            throw customError(409, 'CATEGORY_REF_ERROR', 'No such category');
        }
        next();
    }catch(error){
        if(error.name === 'CastError')
        error = customError(400, 'INVALID_OBJECT_ID', 'Invalid author or category id, id must be 24 chars');
        next(error);
    }
}

module.exports = {bookJoiValidator_middleWare, uniqueBookNameValidator, references_middleware_validator};