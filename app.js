const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Card = require('./models/card');
const {PORT = 3000} = process.env;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.send("Привет");
})

app.get('/users/:userId', (req, res) => {
  res.send(req.params.userId);
})

app.post('/users', (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
})


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})