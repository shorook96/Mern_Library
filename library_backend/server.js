const express = require('express');
const adminRouter = require('./controllers/adminRouter');
require('./db');
const categoryRouter = require('./controllers/categoryRouter');
const {errorHandling_middleware} = require('./middle_wares/errorHandling_middleware');

const app = express();
const cors = require('cors')
const port = 5000;
require('./db');
const userRouter = require('./models/User/userRouter');
app.use(cors()) 
app.use(express.json()); 
   
app.use('/user', userRouter)    



app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(522).send({ message: 'something went wrong' });
    return next();
  }
  res.status(err.status).send({ message: err.errorMsg });
  return next();
});

app.use('/admin',adminRouter);
app.use('/categories', categoryRouter);

app.use(errorHandling_middleware);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
