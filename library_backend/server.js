const express = require('express');
const adminRouter = require('./controllers/adminRouter');
require('./db');
const categoryRouter = require('./controllers/categoryRouter');
const {
  errorHandling_middleware,
} = require('./middle_wares/errorHandling_middleware');
const app = express();
const cors = require('cors');
const port = 5000;
require('./db');
const userRouter = require('./models/User/userRouter');
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
<<<<<<< HEAD
app.use('/admin', adminRouter);
app.use('/categories', categoryRouter);
=======
// app.use('/admin', adminRouter);
// app.use('/categories', categoryRouter);

>>>>>>> 4e14e49d8b4835fa54b9df40992aee869eddcc22
app.use((error, req, res, next) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');
  if (error.code) {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

    res.statusCode = 522;
    res.send({ message: 'something went wrong' });
    return next();
  }
  console.log('ssssssssssssssssssssssssssssssss');
  console.log(error.message);
  res.statusCode = error.status;
  res.send({ message: error.errorMsg });
  return next();
});

<<<<<<< HEAD
=======



>>>>>>> 4e14e49d8b4835fa54b9df40992aee869eddcc22
// app.use(errorHandling_middleware);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
