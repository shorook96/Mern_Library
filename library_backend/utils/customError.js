const customError = (status, code, errorMsg) => {
  const error = new Error(errorMsg);
  error.status = status;
  error.code = code;
  return error;
};
module.exports = customError;
