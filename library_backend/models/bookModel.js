//each book has review is a list of different (usernames and their rating below it )
//each book has a brief
const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  bookName: String,
  brief: String,
  rating: {
    totalRate: { type: Number, default: 0 },
    numberOfRates: { type: Number, default: 0 },
  },
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


