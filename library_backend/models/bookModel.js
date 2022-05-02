const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  bookname: String,
  rating: Number,
  photo: String,
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
