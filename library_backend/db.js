const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bookModel = require('./models/bookModel');

const adminModel = require('./models/adminModel');
const UserModel = require('./models/User/userModel');
// const connectionString = 'mongodb://localhost:27017/TestDataBase';
const connectionString =
  'mongodb+srv://mern123:iot123@projectcluster.euioi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function connectDb() {
  try {
    await mongoose.connect(connectionString);
    console.log('connected to Atlas DB successfuly');
  } catch (e) {
    process.exit(1);
  }
}

connectDb();

/* const createAdmin = async () => {
  await connectDb();
  const password = 'islamKortam';
  const hashedPassword = await bcrypt.hash(password, 12);
  await adminModel.create({username: 'imkortam', email: 'imkortam@gmail.com', hashedPassword});
}

createAdmin(); */

/* const updateAllBooksWithZeroRating = async () => {
  await connectDb();

  const result = await bookModel.updateMany({}, {
      $set: {
        rating: {
          totalRate: 0,
          numberOfRates: 0
        }
      }
  });

  console.log(result);

}

updateAllBooksWithZeroRating();
 */

/*
book
:
628669db76e20888a1cced28
state
:
"Want To Read"
userRating
:
0
*/

/* const updateUsersRatings = async () => {
  await connectDb();

  const result = await UserModel.updateMany({}, {
    $set: {
      books: [
        {book: mongoose.Types.ObjectId('628669db76e20888a1cced28'), state:"Want To Read", userRating: 0},
        {book: mongoose.Types.ObjectId('628669e876e20888a1cced2d'), state:"Want To Read", userRating: 0},
        {book: mongoose.Types.ObjectId('628669db76e20888a1cced28'), state:"Want To Read", userRating: 0},
        {book: mongoose.Types.ObjectId('628669f076e20888a1cced32'), state:"Want To Read", userRating: 0},
        {book: mongoose.Types.ObjectId('628669fe76e20888a1cced3c'), state:"Want To Read", userRating: 0},
      ]
    }
  });

  console.log(result);
}

updateUsersRatings(); */
