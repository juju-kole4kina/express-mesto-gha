const User = require('../models/user.js');

const getUsers = (req,res) => {
  return User.find({})
  .then(users => res.status(200).send(users))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const getUserId = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
  .then(user => res.status(200).send(user))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const createUser = (req,res) => {
  User.create({ ...req.body })
  .then(user => res.status(201).send(user))
  .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports = {
  getUsers,
  getUserId,
  createUser
};