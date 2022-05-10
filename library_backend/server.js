const express = require('express');
const adminRouter = require('./controllers/adminRouter');
require('./db')
const app = express();
const port = 5000;
app.use(express.json());
app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(522).send({ message: 'something went wrong' });
    return next();
  }
  res.status(err.status).send({ message: err.errorMsg });
  return next();
});

app.use('/admin',adminRouter);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
