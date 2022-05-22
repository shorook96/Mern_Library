function customError(status, code, message) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  console.log(error);
  return error;
}

module.exports = customError;
