const Cards = require('../models/card');
const {
  errorCreateCard,
  errorLikeDislikeCard,
  errorCardIsNotFound,
  errorStandart} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send(errorStandart.message))
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;

  Cards.create({name, link, owner})
    .then(card => res.send({data: card}))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(errorCreateCard.statusCode).send(errorCreateCard.message);
        return;
      }
      res.status(500).send(errorStandart.message)
    })
}

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({data: card}))
    .catch(err => {
      if(err.name === 'CastError') {
        res.status(errorCardIsNotFound.statusCode).send(errorCardIsNotFound.message);
        return;
      }
      res.status(500).send(errorStandart.message)
    })
}

module.exports.likeCard  = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {new: true,})
  .then(card => res.send({data: card}))
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(errorLikeDislikeCard.statusCode).send(errorLikeDislikeCard.message);
      return;
    }
    if(err.name === 'CastError') {
      res.status(errorCardIsNotFound.statusCode).send(errorCardIsNotFound.message);
      return;
    }
    res.status(500).send(errorStandart.message)
  })
}

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    {new: true})
  .then(card => res.send({data: card}))
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(errorLikeDislikeCard.statusCode).send(errorLikeDislikeCard.message);
      return;
    }
    if(err.name === 'CastError') {
      res.status(errorCardIsNotFound.statusCode).send(errorCardIsNotFound.message);
      return;
    }
    res.status(500).send(errorStandart.message)
  })
}