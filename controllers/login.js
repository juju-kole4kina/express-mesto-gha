// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BAD_REQUEST_STATUS_CODE,
  // NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(() => {
      res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданны некорректные данные' });
    });
};

module.exports = { login };
