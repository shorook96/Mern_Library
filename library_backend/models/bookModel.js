const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  DOB: Date,
  rating: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
  },
});
const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;
