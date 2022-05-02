const mongoose = require('mongoose');

const connectionString =
  'mongodb+srv://mina2508:iot123@mongodbcluster.njzak.mongodb.net/goodReadsDb?retryWrites=true&w=majority';
async function connectDb() {
  try {
    await mongoose.connect(connectionString);
  } catch (e) {
    process.exit(1);
  }
}
connectDb();
