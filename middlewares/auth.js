const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRET = '../utils/constants.js';
const UnauthorizationError = require('../errors/unauthorization-err');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw new UnauthorizationError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};

module.exports = { auth };
