const User = require('../models/user');
const {
  OK_STATUS_CODE,
  CREATE_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS_CODE).send(users))
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при получении пользователя' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATE_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send('Пользователь с указанным _id не найден');
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Передан несуществующий _id пользователя' });
        return;
      }
      res.status(OK_STATUS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные для обновления аватара пользователя' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Произошла ошибка на сторроне сервера' });
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
};
