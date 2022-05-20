const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: 'string',
  lastname: 'string',
  email: 'string',
  password: 'string',
  image: 'string',
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
      },
      state: {
        type: 'string',
        enum: ['Read', 'Want To Read', 'CurrentlyReading'],
        default: 'Want To Read',
      },
      _id: false,

    },
  ],
});

module.exports = userSchema;
