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
  bio: String,
  photo: String,
});
const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;
