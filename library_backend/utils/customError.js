const customError = (status, code, message) => {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  return error;
}


exports.customError = customError;