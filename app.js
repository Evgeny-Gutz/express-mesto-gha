const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const {PORT = 3000} = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63ffc51ff77baa70d52899e4'
  };

  next();
});
app.use('/users', users);

app.use((req, res, next) => {
  req.user = {
    _id: '63ffc51ff77baa70d52899e4'
  };

  next();
});
app.use('/cards', cards);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})