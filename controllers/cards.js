const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;

  Cards.create({name, link, owner})
    .then(card => res.send({data: card}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({data: card}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.likeCard  = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {new: true,})
  .then(card => res.send({data: card}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    {new: true})
  .then(card => res.send({data: card}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}