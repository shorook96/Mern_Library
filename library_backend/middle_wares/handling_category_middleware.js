const {categorySchema} = require('./../joi_schemas/categoryJoySchema');
const {categoryModel} = require('./../models/categoryModel');

const categoryValidatorMiddleWare = async (req, res, next) => {
    const body = req.body;
    const isValid = await categorySchema.validateAsync(body);
    if(isValid){
        next();
    }else{
        // Custom Error name not valid
        next('');
    }
}

const uniqueCategoryNameValidator = async (req, res, next) => {
    const {name} = req.body;
    try{
        const category = await categoryModel.findOne({name});
        if(category){
            //Custom Error
            throw Error();
        }else{
            next();
        }
    }catch(err){
        console.log(err);
    }
}