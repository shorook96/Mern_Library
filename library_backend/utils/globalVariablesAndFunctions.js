const secretKey = process.env.adminFrontEndhostname;
const saltRounds = parseInt(process.env.saltRounds);
const adminFrontEndhostname = process.env.adminFrontEndhostname;

module.exports = {secretKey, saltRounds, adminFrontEndhostname};