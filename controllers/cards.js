const Card = require('../models/card.js');

const getCards = (req, res) => {
  return Card.find({})
  .then(cards => res.status(200).send(cards))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.status(201).send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .then(card => res.status(204).send(card))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));

};

module.exports = {
  getCards,
  createCard,
  deleteCard
};