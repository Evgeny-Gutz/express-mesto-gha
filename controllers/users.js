const User = require('../models/user');
const {dataUser} = require('../utils/constants');
const {
  errorCreateUser,
  errorUpdateUser,
  errorUpdateAvatar,
  errorUserIsNotFound,
  errorStandart} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send(errorStandart.message))
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(errorCreateUser.statusCode).send(errorCreateUser.message);
        return;
      }
      res.status(500).send(errorStandart.message);
    })
}

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(dataUser(user)))
    .catch(err => {;
      if(err.name === 'CastError') {
        res.status(errorUserIsNotFound.statusCode).send(errorUserIsNotFound.message);
        return;
      }
      res.status(500).send(errorStandart.message)
    })
}

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {name, about}, {
    new: true,
    runValidators: true,
    upsert: false})
    .then(user => res.send(dataUser(user)))
    .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(errorUpdateUser.statusCode).send(errorUpdateUser.message);
    }
    if(err.name === 'CastError') {
      res.status(errorUserIsNotFound.statusCode).send(errorUserIsNotFound.message);
      return;
    }
    res.status(500).send(errorStandart.message)
  })
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {avatar}, {
    new: true,
    runValidators: true,
    upsert: false
})
  .then(user => res.send(dataUser(user)))
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(errorUpdateAvatar.statusCode).send(errorUpdateAvatar.message);
    }
    if(err.name === 'CastError') {
      res.status(errorUserIsNotFound.statusCode).send(errorUserIsNotFound.message);
      return;
    }
    res.status(500).send(errorStandart.message)
  })
}