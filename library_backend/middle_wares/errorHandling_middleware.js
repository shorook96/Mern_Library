const mailer = require('./../utils/mailer');

const errorHandling_middleware = (error, req, res, next) => {
    if(!error.status){
        //Internal Server Error
        mailer.sendEmail({
        to: mailer.officialEmailCredentials.user,
        subject: 'Good Reads | Emergency | Internal Server Error!',
        text:     `URL: ${req.originalUrl}\n \n` 
                + `Error message:\n \n`
                + error.message   
        });
        console.log(error);
        
        error.status = 500;
        error.message = 'Something Went Wrong';
    }
    res.status(error.status).send({message: error.message});
}


module.exports = {errorHandling_middleware};