const Cards = require("../models/card");
const {
  DEFAULT_ERROR,
  SEARCH_ERROR,
  DATA_ERROR,
} = require("../utils/utils");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные при создании карточки." });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Удаление карточки c несуществующим в БД id.");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(DATA_ERROR).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(SEARCH_ERROR).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Добавление лайка c несуществующим в БД id карточки.");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
        return;
      }
      if (err.name === "CastError") {
        res.status(DATA_ERROR).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(SEARCH_ERROR).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Удаление лайка y карточки c несуществующим в БД id.");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(DATA_ERROR).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
        return;
      }
      if (err.name === "CastError") {
        res.status(DATA_ERROR).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(SEARCH_ERROR).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" });
    });
};
