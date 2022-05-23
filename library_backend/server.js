const express = require('express');
const adminRouter = require('./controllers/adminRouter');
const authorRouter = require('./controllers/authorRouter');
const bookRouter = require('./controllers/bookRouter');
const homeRouter = require('./controllers/HomeRouter');

require('./db');
const BookModel = require('./models/bookModel');
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


app.use('/', homeRouter);


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

app.use((error, req, res, next) => {
  
  if (!error.code) {
    console.log("enteredssss"+error.code)
    res.statusCode = 500;
    res.send({ message: 'something went wrong mina' });
    return next();
  }
  console.log(error.message);
  res.statusCode = error.status;
  res.send({ message: error.code});
  return next();
}); 

app.use(errorHandling_middleware);

// app.use(errorHandling_middleware);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
