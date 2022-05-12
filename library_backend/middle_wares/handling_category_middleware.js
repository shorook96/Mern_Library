const {categorySchema} = require('./../joi_schemas/categoryJoySchema');
const categoryModel = require('./../models/categoryModel');
const customError = require('../utils/customError');

const categoryJoiValidator_middleWare = async (req, res, next) => {
    //Done on PATCH and POST methods only
    if(!(req.method === 'POST' || req.method === 'PATCH')){
        next();
        return; // Early return;
    }

    const body = req.body;
    let validatedBody = {};
    try{
        validatedBody = await categorySchema.validateAsync(body);
        req.body = validatedBody;
        next();
    }catch(err){
        if(err.isJoi){
            err.status = 422;
        }
        next(err);
    }
}

const uniqueCategoryNameValidator = async (req, res, next) => {
    //Done on POST mehtod only
    if(req.method !== 'POST'){
        next();
        return; // Early return;
    }

    const {categoryName} = req.body;
    try{
        const category = await categoryModel.findOne({categoryName});
        if(category){
            //Custom Error
            throw customError(409, 'DUPLICATE_ENTITY', '409 Error! Category name exists');
        }else{
            next();
        }
    }catch(error){
        next(error)
    }
}

module.exports = {categoryJoiValidator_middleWare, uniqueCategoryNameValidator};