const errorHandling_middleware = (error, req, res, next) => {
    if(!error.status){
        //Internal Server Error
        error.status = 500;
        error.message = 'Something Went Wrong';
    }
    res.status(error.status).send({message: error.message});
}


module.exports({errorHandling_middleware});