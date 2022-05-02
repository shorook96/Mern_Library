const mongoose = require('mongoose');
const authorSchema = mongoose.Schema({
  name: String,
  image: String,
});
const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;
