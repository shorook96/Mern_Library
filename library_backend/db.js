const mongoose = require('mongoose');
const connectionString =
  'mongodb+srv://mern123:iot123@projectcluster.euioi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
async function connectDb() {
  try {
    await mongoose.connect(connectionString);
  } catch (e) {
    process.exit(1);
  }
}
connectDb();