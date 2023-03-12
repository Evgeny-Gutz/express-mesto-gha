const User = require("../models/user");
const { dataUser } = require("../utils/constants");
const {
  addErrorsGetUsers,
  addErrorsCreateUser,
  addErrorsFindUser,
  addErrorsUpdateUser,
  addErrorsUpdateAvatar,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      addErrorsGetUsers(res, err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      addErrorsCreateUser(res, err);
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      addErrorsFindUser(res, err);
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      addErrorsUpdateUser(res, err);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      addErrorsUpdateAvatar(res, err);
    });
};
