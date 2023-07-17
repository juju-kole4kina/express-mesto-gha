const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send('Пользователь с указанным _id не найден');
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при получении карточки' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
