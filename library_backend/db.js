const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminModel = require('./models/adminModel');
const connectionString = 'mongodb://localhost:27017/TestDataBase';
// const connectionString =
// 'mongodb+srv://mern123:iot123@projectcluster.euioi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
async function connectDb() {
  try {
    await mongoose.connect(connectionString);
    console.log('connected to Atlas DB successfuly');
  } catch (e) {
    process.exit(1);
  }
}

connectDb();
