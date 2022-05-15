const express = require('express');
const adminRouter = require('./controllers/adminRouter');
const authorRouter = require('./controllers/authorRouter');
const bookRouter = require('./controllers/bookRouter');
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
app.use('/admin', adminRouter);
app.use('/categories', categoryRouter);
// app.use('/admin', adminRouter);
// app.use('/categories', categoryRouter);

app.use(cors());
app.use(express.json());

app.use(['/users', '/user'], userRouter);
app.use(['/authors', '/author'], authorRouter);
app.use(['/books', '/book'], bookRouter);
// app.use('[/books,/book]', bookRouter)

app.use('/admin', adminRouter);
app.use('/categories', categoryRouter);

/* app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(522).send({ message: 'something went wrong' });
>>>>>>> d1629f0d911ad55633c563df6894396abfd0caf7
app.use((error, req, res, next) => {
  if (error.code) {
    res.statusCode = 522;
    res.send({ message: 'something went wrong' });
    return next();
  }
  console.log(error.message);
  res.statusCode = error.status;
  res.send({ message: error.errorMsg });
  return next();
});

// app.use(errorHandling_middleware);
}); */

app.use(errorHandling_middleware);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
