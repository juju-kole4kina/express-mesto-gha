const Card = require('../models/card');
const {
  OK_STATUS_CODE,
  CREATE_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATE_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.status(OK_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при получении карточки' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(OK_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(OK_STATUS_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
