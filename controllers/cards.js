const Card = require('../models/card.js');

const getCards = (req, res) => {
  return Card.find({})
  .then(cards => res.status(200).send(cards))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.status(201).send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .then(card => res.status(200).send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const deleteLike = (req,res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(card => res.send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike
};