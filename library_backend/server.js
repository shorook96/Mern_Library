const express = require('express');
const adminRouter = require('./controllers/adminRouter');
const authorRouter = require('./controllers/authorRouter');
const bookRouter = require('./controllers/bookRouter');
require('./db');
const categoryRouter = require('./controllers/categoryRouter');
const {errorHandling_middleware} = require('./middle_wares/errorHandling_middleware');


const app = express();
const cors = require('cors');
const port = 5000;
require('./db');
const userRouter = require('./models/User/userRouter');
app.use(cors()) 
app.use(express.json()); 
   
app.use(['/users','/user'], userRouter)   
app.use(['/authors','/author'], authorRouter) 
app.use(['/books','/book'], bookRouter) 
// app.use('[/books,/book]', bookRouter) 

app.use('/admin', adminRouter);
app.use('/categories', categoryRouter);






/* app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(522).send({ message: 'something went wrong' });
app.use((error, req, res, next) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');
  if (error.code) {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

    res.statusCode = 522;
    res.send({ message: 'something went wrong' });
>>>>>>> 1782a9e0acf1e4d410722d8366202e6bcdbb6541
    return next();
  }
  console.log('ssssssssssssssssssssssssssssssss');
  console.log(error.message);
  res.statusCode = error.status;
  res.send({ message: error.errorMsg });
  return next();
}); */


app.use(errorHandling_middleware);


app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
