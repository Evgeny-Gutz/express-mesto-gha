const Cards = require("../models/card");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании карточки." });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Удаление карточки c несуществующим в БД id.");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Добавление лайка c несуществующим в БД id карточки.");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
        return;
      }
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      throw new ReferenceError("Удаление лайка y карточки c несуществующим в БД id.");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные для постановки/снятии лайка." });
        return;
      }
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка c указанным _id не найдена." });
        return;
      }
      if (err.name === "ReferenceError") {
        res.status(404).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
