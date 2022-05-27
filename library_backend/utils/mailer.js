const nodemailer = require('nodemailer');


const officialEmailCredentials = {
    user: process.env.officialEmail,
    pass: process.env.officialEmailPassword
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: officialEmailCredentials
})

const sendEmail = (mail) => {
    mail.from = officialEmailCredentials.user;
    return new Promise((resolve, reject) => {
        transporter.sendMail(mail, (error, info) => {
            if(error){
                reject(error);
            }else{
                resolve(info.response);
            }
        });
    });
}

module.exports = {sendEmail, officialEmailCredentials};