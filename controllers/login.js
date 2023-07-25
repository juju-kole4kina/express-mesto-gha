const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = '../utils/constants.js';
const UnauthorizationError = require('../errors/unauthorization-err');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(() => {
      next(new UnauthorizationError('Переданны некорректные данные'));
    });
};

module.exports = { login };
