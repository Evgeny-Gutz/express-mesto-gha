const User = require("../models/user");
const { dataUser } = require("../utils/utils");
const {
  DEFAULT_ERROR,
  SEARCH_ERROR,
  DATA_ERROR,
} = require("../utils/utils");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные при создании пользователя" });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(dataUser(user)))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(DATA_ERROR).send({ message: "Пользователь c указанному _id не найден." });
        return;
      }
      if (err.name === "TypeError") {
        res.status(SEARCH_ERROR).send({ message: "Получение пользователя c несуществующим в БД id." });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
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
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные при обновлении профиля." });
      }
      if (err.name === "CastError") {
        res.status(DATA_ERROR).send({ message: "Пользователь c указанному _id не найден." });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
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
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные при обновлении аватара." });
      }
      if (err.name === "CastError") {
        res.status(SEARCH_ERROR).send({ message: "Пользователь c указанному _id не найден." });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};
