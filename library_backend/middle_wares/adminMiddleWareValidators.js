const {newAdminSchema} = require('../joi_schemas/newAdminShema');
const {adminActivationSchema} = require('../joi_schemas/adminActivationSchema');

const adminCreateMiddlewareValidator = async (req, res, next) => {
    //Done on POST methods only
    if(!(req.method === 'POST' && req.originalUrl === '/admin')){
        next();
        return; // Early return;
    }

    const body = req.body;
    let validatedBody = {};
    try{
        validatedBody = await newAdminSchema.validateAsync(body);
        req.body = validatedBody;
        next();
    }catch(err){
        if(err.isJoi){
            err.status = 422;
        }
        next(err);
    }
}


const adminActivateMiddlewareValidator = async (req, res, next) => {
    //Done on POST methods only
    if(!(req.method === 'POST')){
        next();
        return; // Early return;
    }
    const body = req.body;
    console.log(body);
    let validatedBody = {};
    try{
        validatedBody = await adminActivationSchema.validateAsync(body);
        req.body = validatedBody;
        next();
    }catch(err){
        if(err.isJoi){
            err.status = 422;
        }
        next(err);
    }
}

module.exports = {adminActivateMiddlewareValidator, adminCreateMiddlewareValidator};