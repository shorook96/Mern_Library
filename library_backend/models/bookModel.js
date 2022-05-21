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
<<<<<<< HEAD
  brief: String,
  rating: Number,
=======
  brief: { type: String, default: '' },
  rating: {
    totalRate: { type: Number, default: 0 },
    numberOfRates: { type: Number, default: 0 },
  },
>>>>>>> 84267d535a79b80b45710ea5ab407f6e5c675f03
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
