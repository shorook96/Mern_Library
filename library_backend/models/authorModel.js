//each author has an array of books 
// each author has a bio about himself 
const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
},
  firstname: String,
  lastname: String,
  DOB: Date,
  photo: String,
  bio: {type: String, default:""},
  books: [{
    type: mongoose.Schema.Types.ObjectId, ref:'Book'
}]


});
authorSchema.methods = {
  getFullName: function () {
      return this.firstname + ' ' + this.lastname
  },
  getBooks: function () {
      return this.books
  },
  
}

const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;
