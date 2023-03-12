const Cards = require("../models/card");
const {
  addErrorsCardDelete,
  addErrorsLike,
  addErrorsDislike,
  addErrorsCreateCard,
} = require("../utils/errors");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Стандартная ошибка" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      addErrorsCreateCard(res, err);
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      }
      return card;
    })
    .then((card) => card)
    .catch((err) => {
      addErrorsCardDelete(res, err);
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
      }
      return card;
    })
    .then((card) => card)
    .catch((err) => {
      addErrorsLike(res, err);
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
      }
      return card;
    })
    .then((card) => card)
    .catch((err) => {
      addErrorsDislike(res, err);
    });
};
