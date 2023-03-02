const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {name, about}, {
    new: true,
    runValidators: true,
    upsert: false
})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {avatar}, {
    new: true,
    runValidators: true,
    upsert: false
})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}