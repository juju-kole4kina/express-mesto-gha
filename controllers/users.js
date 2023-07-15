const User = require('../models/user.js');

const getUsers = (req,res) => {
  return User.find({})
  .then(users => res.status(200).send(users))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки'
      });
    }
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` })
  });
};

const getUserId = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
  .then(user => res.status(200).send(user))
  .catch((err) => {
    if (err.kind === 'ObjectID') {
      return res.status(404).send('Карточка с указанным _id не найдена');
    }
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` })
  });
};

const createUser = (req,res) => {
  User.create({ ...req.body })
  .then(user => res.status(201).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки'
      });
    }
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` })
  });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
  .then(user => res.status(200).send(user))
  .catch((err) => {
    if (err.kind === 'ObjectID') {
      return res.status(404).send('Передан несуществующий _id карточки');
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для снятия лайка'
      });
    }
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` })
  });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
  .then(user => res.status(200).send(user))
  .catch((err) => {
    if (err.kind === 'ObjectID') {
      return res.status(404).send('Передан несуществующий _id карточки');
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({
        message: 'Переданы некорректные данные для снятия лайка'
      });
    }
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` })
  });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar
};