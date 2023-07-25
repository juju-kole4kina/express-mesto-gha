const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZATION_STATUS_CODE } = require('../utils/constants');

// const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_SECRET = '686b888065dc0105ef5799cae9ea58bae758dec68a657e4f3ff2d673a2048cdd';

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      const bearerToken = `Bearer ${token}`;
      res.cookie('jwt', bearerToken, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ bearerToken });
    })
    .catch(() => {
      res.status(UNAUTHORIZATION_STATUS_CODE).send({ message: 'Переданны некорректные данные' });
    });
};

module.exports = { login };
