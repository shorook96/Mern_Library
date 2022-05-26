const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  username: 'string',
  email: 'string',
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  hashedPassword: 'string'
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;
