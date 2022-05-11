const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: 'string',
    lastname: 'string',
    email: 'string', 
    password: 'string',
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
      }],
});

module.exports = userSchema;