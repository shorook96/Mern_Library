const mongoose = require('mongoose');
const authorSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  DOB: Date,
  photo: String,
});
const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;
